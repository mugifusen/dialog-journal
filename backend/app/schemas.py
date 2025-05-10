from pydantic import BaseModel
from datetime import datetime

class JournalCreate(BaseModel):
    content: str

class JournalResponse(BaseModel):
    id: int
    content: str
    created_at: datetime
    sentiment_score: float
    model_config = {'from_attributes': True}

class ScoreResponse(BaseModel):
    date: str
    score: float