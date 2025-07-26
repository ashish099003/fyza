# backend/profile/financialgoals/models.py
import enum
import uuid

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
    ForeignKey,
    Enum as SqlEnum,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from backend.models import Base  # reuse existing declarative base


class PriorityEnum(str, enum.Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"


class FinancialGoal(Base):
    __tablename__ = "financial_goals"

    goal_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    user_id = Column(
        Integer,
        ForeignKey("user_profiles.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    goal_name = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    target_date = Column(Date, nullable=False)
    priority = Column(SqlEnum(PriorityEnum), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
