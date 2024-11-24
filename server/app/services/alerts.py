from fastapi import HTTPException, status
from app.database import db
from app.schemas.alerts import DiscordInput, DiscordResponse, Connection
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from datetime import datetime
from bson import ObjectId
from app.database import db
import aiohttp

alert_connection = db["alertconnect"]
users_collection = db["user"]

async def adddiscord(data: DiscordInput) -> DiscordResponse: 
    try:
        user_id = ObjectId(data.user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        ) 
    user = await users_collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User ID does not exist in the users collection"
        ) 
    alert_data = data.dict()
    alert_data["_id"] = ObjectId()   
    result = await alert_connection.insert_one(alert_data) 
    return DiscordResponse(status="Success")

async def getconnections(data: Connection) -> dict:
    user_id_str = data.user_id
    items = await alert_connection.find({"user_id": user_id_str}).to_list(length=None)
    if not items:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Connections not found"
        ) 
    for item in items:
        if "_id" in item:
            item["_id"] = str(item["_id"])
    return {"connections": items}


# models_service.py
from bson import ObjectId
from datetime import datetime
from fastapi import HTTPException, status
from app.database import db

alert_collection = db["alerts"]
alertcollect = db["alertconnect"]
# Business Logic and Database Operations

async def create_alert(data):
    """
    Inserts a new alert into the database, sends a notification to the Discord webhook,
    and triggers an external API if a webhook exists.
    """
    try:
        # Validate user_id
        user_id = ObjectId(data.user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )

    # Create the alert
    alert = {
        "_id": ObjectId(),
        "user_id": user_id,
        "alert_title": data.alert_title,
        "viewed": False,  # Default to not viewed
        "timestamp": datetime.utcnow()  # Current timestamp
    }

    # Insert the alert into the database
    result = await alert_collection.insert_one(alert)

    # Format the alert for response
    alert["_id"] = str(result.inserted_id)
    alert["user_id"] = str(alert["user_id"])
    alert["timestamp"] = alert["timestamp"].isoformat()

    # Query the alertconnect collection to find the Discord webhook
    webhook_data = await alertcollect.find_one({"user_id": alert["user_id"], "type": "discord"})

    if webhook_data and "webhookUrl" in webhook_data:
        # Send the alert notification to the Discord webhook
        webhook_url = webhook_data["webhookUrl"]
        message = {
            "content": f"🔔 Alert: {alert['alert_title']}\nTimestamp: {alert['timestamp']}"
        }

        # Send the notification to the Discord webhook
        async with aiohttp.ClientSession() as session:
            try:
                # Send to Discord webhook
                async with session.post(webhook_url, json=message) as response:
                    if response.status != 204:
                        raise HTTPException(
                            status_code=response.status,
                            detail="Failed to send notification to Discord webhook"
                        )

                # Trigger external API
                external_api_payload = {
                    "message": alert["alert_title"],
                    "webhookUrl": webhook_url
                }
                async with session.post(
                    "https://1b24d2inri.execute-api.ap-south-1.amazonaws.com/DiscordHook",
                    json=external_api_payload
                ) as external_response:
                    if external_response.status != 200:
                        raise HTTPException(
                            status_code=external_response.status,
                            detail="Failed to trigger external DiscordHook API"
                        )
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Error sending notifications: {str(e)}"
                )

    return alert

async def get_user_alerts(user_id: str):
    """
    Retrieves all alerts for a given user ID.
    """
    try:
        user_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )

    alerts = await alert_collection.find({"user_id": user_id}).to_list(length=None)

    if not alerts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No alerts found for the given user ID"
        )

    # Convert ObjectId and timestamp to string for serialization
    for alert in alerts:
        alert["_id"] = str(alert["_id"])
        alert["user_id"] = str(alert["user_id"])
        alert["timestamp"] = alert["timestamp"].isoformat()

    return alerts


async def mark_alerts_as_viewed(user_id: str):
    """
    Marks all non-viewed alerts as viewed for a given user ID.
    """
    try:
        user_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )

    result = await alert_collection.update_many(
        {"user_id": user_id, "viewed": False},
        {"$set": {"viewed": True}}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No non-viewed alerts found"
        )

    return result.modified_count


async def delete_alert(alert_id: str):
    """
    Deletes an alert by its ID.
    """
    try:
        alert_id = ObjectId(alert_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid alert ID format"
        )

    result = await alert_collection.delete_one({"_id": alert_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )

    return result.deleted_count
