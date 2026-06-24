from pydantic import BaseModel

class ReviewRequest(BaseModel):
    business_id: str
    rating: int
    selected: list