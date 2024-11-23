from fastapi import APIRouter, HTTPException
from app.services.logs import create_log, get_log, update_log, delete_log, get_logs_by_user_id
from app.schemas.logs import LogCreate, LogUpdate, LogResponse
from typing import List

router = APIRouter(prefix="/logs", tags=["Logs"])

@router.post("/", response_model=LogResponse)
async def create_log_route(log: LogCreate):
    try:
        log_data = await create_log(log.dict())
        return LogResponse(
            id=log_data["_id"], message=log_data["message"], level=log_data["level"], timestamp=log_data["timestamp"], user_id=log_data["user_id"]
        )
    except HTTPException as e:
        raise e

@router.get("/{log_id}", response_model=LogResponse)
async def get_log_route(log_id: str):
    return await get_log(log_id)

@router.put("/{log_id}", response_model=LogResponse)
async def update_log_route(log_id: str, log_update: LogUpdate):
    updated_log = await update_log(log_id, log_update.dict(exclude_unset=True))
    return LogResponse(
        id=updated_log["_id"], message=updated_log["message"], level=updated_log["level"], timestamp=updated_log["timestamp"], user_id=updated_log["user_id"]
    )

@router.delete("/{log_id}")
async def delete_log_route(log_id: str):
    return await delete_log(log_id)

@router.get("/user/{user_id}", response_model=List[LogResponse])
async def get_logs_by_user_id_route(user_id: str):
    logs = await get_logs_by_user_id(user_id)
    return [
        LogResponse(
            id=log["_id"], message=log["message"], level=log["level"], timestamp=log["timestamp"], user_id=log["user_id"]
        )
        for log in logs
    ]
