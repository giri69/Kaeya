from fastapi import HTTPException, status
from app.database import db
from app.schemas.alerts import DiscordInput, DiscordResponse, Connection
from fastapi.encoders import jsonable_encoder
from bson import ObjectId

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