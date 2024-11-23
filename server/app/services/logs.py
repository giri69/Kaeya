from fastapi import HTTPException, status, Query
from app.database import client   
from bson import ObjectId
from typing import List


db = client["SIEMLogs"]  
logs_collection = db["log"]

async def create_log(log_data: dict) -> dict:
    
    try:
        log_data["user_id"] = str(ObjectId(log_data["user_id"]))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
 
    log_data["_id"] = str(ObjectId())
    result = await logs_collection.insert_one(log_data)
    log_data["id"] = str(result.inserted_id)
    return log_data

async def get_log(log_id: str) -> dict:
    log = await logs_collection.find_one({"_id": log_id})
    if not log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Log not found")
    log["id"] = str(log["_id"])
    return log

async def update_log(log_id: str, update_data: dict) -> dict:
    result = await logs_collection.update_one({"_id": log_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Log not found")
    return await get_log(log_id)

async def delete_log(log_id: str) -> dict:
    result = await logs_collection.delete_one({"_id": log_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Log not found")
    return {"message": "Log deleted successfully"}

async def get_logs_by_user_id(user_id: str, page: int, page_size: int) -> list:
    try:
        # Calculate skip value for pagination
        skip = (page - 1) * page_size

        # Query with pagination
        logs_cursor = logs_collection.find({"userId": user_id}).skip(skip).limit(page_size)
        logs = await logs_cursor.to_list(length=None)

        # Convert ObjectId to string
        formatted_logs = []
        for log in logs:
            log["_id"] = str(log["_id"])  # Convert ObjectId to string
            if "userId" in log and isinstance(log["userId"], ObjectId):
                log["userId"] = str(log["userId"])
            formatted_logs.append(log)

        return formatted_logs
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch logs: {str(e)}"
        )
        