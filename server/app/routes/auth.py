from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserRegister, UserLogin, UserResponse
from app.services.auth import register_user, login_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
async def register(user: UserRegister):
    try:
        return await register_user(user)
    except HTTPException as e:
        raise e

@router.post("/login", response_model=UserResponse)
async def login(user: UserLogin):
    try:
        return await login_user(user)
    except HTTPException as e:
        raise e
