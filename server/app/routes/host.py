from fastapi import APIRouter, HTTPException
from app.services.host import create_host, get_host, update_host, delete_host, get_hosts_by_user_id
from app.schemas.host import HostCreate, HostUpdate, HostResponse
from typing import List


router = APIRouter(prefix="/source", tags=["Services (Host)"])

@router.post("/", response_model=HostResponse)
async def create_host_route(host: HostCreate):
    try:
        host_data = await create_host(host.dict())
        return HostResponse(id=host_data["_id"], name=host_data["name"], tag=host_data["tag"], user_id=host_data["user_id"])
    except HTTPException as e:
        raise e

@router.get("/{host_id}", response_model=HostResponse)
async def get_host_route(host_id: str):
    return await get_host(host_id)

@router.put("/{host_id}", response_model=HostResponse)
async def update_host_route(host_id: str, host_update: HostUpdate):
    updated_host = await update_host(host_id, host_update.dict(exclude_unset=True))
    return HostResponse(id=updated_host["_id"], name=updated_host["name"], tag=updated_host["tag"], user_id=updated_host["user_id"])

@router.delete("/{host_id}")
async def delete_host_route(host_id: str):
    return await delete_host(host_id)

@router.get("/user/{user_id}", response_model=List[HostResponse])
async def get_hosts_by_user_id_route(user_id: str):
    hosts = await get_hosts_by_user_id(user_id)
    return [HostResponse(id=host["_id"], name=host["name"], tag=host["tag"], user_id=host["user_id"]) for host in hosts]