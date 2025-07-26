# backend/profile/financialgoals/schemas.py
from datetime import date, datetime
from uuid import UUID
from typing import Optional
import enum

from pydantic import BaseModel, Field, validator


class PriorityEnum(str, enum.Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"


class FinancialGoalBase(BaseModel):
    user_id: int
    goal_name: str = Field(..., min_length=1)
    target_amount: float = Field(..., gt=0)
    target_date: date
    priority: PriorityEnum

    @validator("target_date")
    def must_be_future(cls, v: date):
        if v <= date.today():
            raise ValueError("target_date must be in the future")
        return v


class FinancialGoalCreate(FinancialGoalBase):
    pass


class FinancialGoalUpdate(BaseModel):
    goal_name: Optional[str] = Field(None, min_length=1)
    target_amount: Optional[float] = Field(None, gt=0)
    target_date: Optional[date]
    priority: Optional[PriorityEnum]

    @validator("target_date")
    def must_be_future(cls, v: date):
        if v is not None and v <= date.today():
            raise ValueError("target_date must be in the future")
        return v


class FinancialGoalResponse(FinancialGoalBase):
    goal_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
