from fastapi import HTTPException, status
from app.database import db
from bson import ObjectId

hosts_collection = db["hosts"]
users_collection = db["user"]  

async def create_host(host_data: dict) -> dict:
    try:
        user_id = ObjectId(host_data["user_id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
 
    user = await users_collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User ID does not exist in the users collection"
        )
 
    host_data["_id"] = str(ObjectId())
    result = await hosts_collection.insert_one(host_data)
    host_data["id"] = str(result.inserted_id)
    return host_data

async def get_host(host_id: str) -> dict:
    host = await hosts_collection.find_one({"_id": host_id})
    if not host:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Host not found")
    host["id"] = str(host["_id"])
    return host

async def update_host(host_id: str, update_data: dict) -> dict:
    result = await hosts_collection.update_one({"_id": host_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Host not found")
    return await get_host(host_id)

async def delete_host(host_id: str) -> dict:
    result = await hosts_collection.delete_one({"_id": host_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Host not found")
    return {"message": "Host deleted successfully"}

async def get_hosts_by_user_id(user_id: str) -> list: 
    try:
        user_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
 
    hosts_cursor = hosts_collection.find({"user_id": str(user_id)})
    hosts = await hosts_cursor.to_list(length=None) 
 
    for host in hosts:
        host["id"] = str(host["_id"])

    return hosts