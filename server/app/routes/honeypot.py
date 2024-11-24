from fastapi import APIRouter, HTTPException
from app.services.host import create_host, get_host, update_host, delete_host, get_hosts_by_user_id
from app.schemas.host import HostCreate, HostUpdate, HostResponse
from typing import List
from app.services.honeypot import get_honeypot_logs_by_user_id
from app.database import dbb

honeypotlog_collection = dbb["honeypotlog"]

router = APIRouter(prefix="/honey", tags=["Honey"])

@router.get("/honeypot/logs/{user_id}")
async def get_honeypot_logs(user_id: str):
    """
    API endpoint to fetch all honeypot logs for a given user ID.
    Args:
        user_id (str): The ID of the user to fetch logs for.
    Returns:
        list: List of honeypot logs for the specified user ID.
    """
    try:
        logs = await get_honeypot_logs_by_user_id(user_id, honeypotlog_collection)
        return logs
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )
