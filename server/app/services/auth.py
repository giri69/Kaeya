from fastapi import HTTPException, status
from app.database import users_collection
from app.schemas.user import UserRegister, UserLogin, UserResponse

from passlib.hash import bcrypt
from pymongo.errors import DuplicateKeyError

users_collection.create_index("email", unique=True)

async def register_user(user: UserRegister) -> UserResponse:
    hashed_password = bcrypt.hash(user.password)
    user_data = {"name": user.name, "email": user.email, "password": hashed_password}

    try:
        result = await users_collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)  
        return UserResponse(id=user_data["_id"], name=user_data["name"], email=user_data["email"])
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

async def login_user(user: UserLogin) -> UserResponse:
    stored_user = await users_collection.find_one({"email": user.email})
    if not stored_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password"
        )

    if not bcrypt.verify(user.password, stored_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password"
        )

     
    return UserResponse(
        id=str(stored_user["_id"]), 
        name=stored_user["name"],
        email=stored_user["email"],
    )
