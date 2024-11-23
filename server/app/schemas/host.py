from pydantic import BaseModel
from typing import Optional

class HostBase(BaseModel):
    name: str
    tag: str

class HostCreate(HostBase):
    user_id: str  

class HostUpdate(BaseModel):
    name: Optional[str] = None
    tag: Optional[str] = None

class HostResponse(HostBase):
    id: str
    user_id: str
