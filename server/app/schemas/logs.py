from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LogBase(BaseModel):
    message: str
    level: str  # E.g., INFO, ERROR, DEBUG
    timestamp: datetime
    user_id: str

class LogCreate(LogBase):
    pass

class LogUpdate(BaseModel):
    message: Optional[str] = None
    level: Optional[str] = None
    timestamp: Optional[datetime] = None

class LogResponse(LogBase):
    id: str
