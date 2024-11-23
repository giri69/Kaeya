from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from datetime import datetime

class DiscordInput(BaseModel):
    user_id: str
    webhookUrl: str
    type: str

class DiscordResponse(BaseModel):
    status: str

class Connection(BaseModel):
    user_id: str


class AlertInput(BaseModel):
    user_id: str
    alert_title: str


class AlertResponse(BaseModel):
    id: str = Field(..., alias="_id")
    user_id: str
    alert_title: str
    viewed: bool
    timestamp: str


class UpdateResponse(BaseModel):
    status: str
    modified_count: int


class DeleteResponse(BaseModel):
    status: str
    deleted_count: int


class AlertListResponse(BaseModel):
    alerts: List[AlertResponse]

