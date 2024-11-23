from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserRegister, UserLogin, UserResponse
from app.schemas.alerts import DiscordInput, DiscordResponse, Connection,  AlertInput, AlertResponse, UpdateResponse, DeleteResponse, AlertListResponse
from app.services.alerts import adddiscord, getconnections, create_alert, get_user_alerts, mark_alerts_as_viewed, delete_alert


router = APIRouter(prefix="/alert", tags=["Alerts"])

@router.post("/setdiscord", response_model=DiscordResponse)
async def setDiscord(data: DiscordInput):
    try:
        return await adddiscord(data)
    except HTTPException as e:
        raise e
    
@router.post("/allconnections")
async def Getallconnection(data: Connection):
    try:
        return await getconnections(data)
    except HTTPException as e:
        raise e
    
# routes.py
from fastapi import APIRouter, HTTPException, status
from app.services.alerts import create_alert, get_user_alerts, mark_alerts_as_viewed, delete_alert


@router.post("/", response_model=AlertResponse)
async def add_alert_route(data: AlertInput):
    try:
        alert = await create_alert(data)
        return alert
    except HTTPException as e:
        raise e


@router.get("/{user_id}", response_model=AlertListResponse)
async def get_alerts_route(user_id: str):
    try:
        alerts = await get_user_alerts(user_id)
        return {"alerts": alerts}
    except HTTPException as e:
        raise e


@router.put("/{user_id}/viewed", response_model=UpdateResponse)
async def mark_alerts_viewed_route(user_id: str):
    try:
        modified_count = await mark_alerts_as_viewed(user_id)
        return {"status": "Success", "modified_count": modified_count}
    except HTTPException as e:
        raise e


@router.delete("/{alert_id}", response_model=DeleteResponse)
async def delete_alert_route(alert_id: str):
    try:
        deleted_count = await delete_alert(alert_id)
        return {"status": "Success", "deleted_count": deleted_count}
    except HTTPException as e:
        raise e

@router.put("/{user_id}/viewed", response_model=UpdateResponse)
async def mark_alerts_viewed_route(user_id: str):
    try:
        modified_count = await mark_alerts_as_viewed(user_id)
        if modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No non-viewed alerts found"
            )
        return {"status": "Success", "modified_count": modified_count}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete("/{alert_id}", response_model=DeleteResponse)
async def delete_alert_route(alert_id: str):
    try:
        deleted_count = await delete_alert(alert_id)
        if deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Alert not found"
            )
        return {"status": "Success", "deleted_count": deleted_count}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
