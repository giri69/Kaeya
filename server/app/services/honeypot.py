from fastapi import HTTPException, status
from bson import ObjectId
from pymongo.collection import Collection

async def get_honeypot_logs_by_user_id(user_id: str, honeypotlog_collection: Collection) -> list:
    """
    Fetch all honeypot logs for a given user ID.
    
    Args:
        user_id (str): The ID of the user whose logs need to be fetched.
        honeypotlog_collection (Collection): MongoDB collection instance for honeypot logs.
    
    Returns:
        list: List of formatted honeypot logs for the specified user ID.
    
    Raises:
        HTTPException: If there is an error in fetching the logs.
    """
    try:
        # Debugging: Print the incoming user_id
        print(f"Fetching logs for user_id: {user_id}")

        # Fetch logs from the MongoDB collection
        logs_cursor = honeypotlog_collection.find({"user_id": user_id})
        logs = await logs_cursor.to_list(length=None)

        # Debugging: Print the raw logs fetched
        print(f"Raw logs fetched from the database: {logs}")

        # Process and format logs
        formatted_logs = []
        for log in logs:
            # Debugging: Print the raw log being processed
            print(f"Processing log: {log}")

            # Convert ObjectId fields to strings
            if "_id" in log and isinstance(log["_id"], ObjectId):
                log["_id"] = str(log["_id"])
            if "user_id" in log and isinstance(log["user_id"], ObjectId):
                log["user_id"] = str(log["user_id"])
            if "service_id" in log and isinstance(log["service_id"], ObjectId):
                log["service_id"] = str(log["service_id"])

            # Add the formatted log to the result list
            formatted_logs.append(log)

            # Debugging: Print the formatted log
            print(f"Formatted log: {log}")

        # Debugging: Print the final formatted logs
        print(f"Final formatted logs: {formatted_logs}")

        return formatted_logs
    except Exception as e:
        # Debugging: Print the error encountered
        print(f"Error occurred while fetching honeypot logs: {str(e)}")

        # Raise an HTTPException for internal server error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch honeypot logs: {str(e)}"
        )
