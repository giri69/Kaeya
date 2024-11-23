from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserRegister, UserLogin, UserResponse
from app.schemas.alerts import DiscordInput, DiscordResponse, Connection
from app.services.alerts import adddiscord, getconnections

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