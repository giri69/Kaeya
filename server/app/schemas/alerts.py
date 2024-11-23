from pydantic import BaseModel, HttpUrl

class DiscordInput(BaseModel):
    user_id: str
    webhookUrl: str
    type: str

class DiscordResponse(BaseModel):
    status: str

class Connection(BaseModel):
    user_id: str