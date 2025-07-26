from pydantic import BaseModel
from typing import Optional

class UserProfileBase(BaseModel):
    first_name: str
    last_name: str
    age: int
    annual_income: float
    city: str
    occupation: str
    dependents: int
    risk_profile: str

class UserProfileResponse(UserProfileBase):
    id: int

    class Config:
        orm_mode = True

class UserProfileCreate(UserProfileBase):
    pass
