
from pydantic import BaseModel, Field
from typing import List, Optional
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

# Schema for an individual log entry
class Log(BaseModel):
    timestamp: str
    level: str
    file_name: str
    message: str
    hash: str


# Schema for the log batch entry (MongoDB document)
class LogBatch(BaseModel):
    id: Optional[str] = Field(alias="_id")  # Optional MongoDB document ID
    userId: str
    serviceId: str
    log_batch: List[Log]  # List of log entries


# Schema for the response of the log counter API
class LogCountResponse(BaseModel):
    INFO: int
    WARN: int
    DEBUG: int
    ERROR: int
