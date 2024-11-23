from fastapi import APIRouter, HTTPException, Query, status
from app.services.logs import create_log, get_log, update_log, delete_log, get_logs_by_user_id, count_log_levels
from app.schemas.logs import LogCreate, LogUpdate, LogResponse
from typing import List, Any
from fastapi.responses import JSONResponse


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

@router.get("/user/{user_id}", response_model=Any)
async def get_logs_by_user_id_route(
    user_id: str, 
    page: int = Query(1, ge=1),  # Page number (default is 1, must be >= 1)
    page_size: int = Query(1, ge=1, le=100)  # Page size (default is 1, must be >= 1 and <= 100)
):
    logs = await get_logs_by_user_id(user_id, page, page_size)
    return JSONResponse(content=logs)

@router.get("/logs/{user_id}/count", response_model=Any)
async def get_log_count(user_id: str):
    try:
        return await count_log_levels(user_id)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch log counts: {str(e)}"
        )
