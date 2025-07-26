# backend/profile/financialgoals/crud.py
from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from .models import FinancialGoal
from .schemas import FinancialGoalCreate, FinancialGoalUpdate


def get_goals_for_user(db: Session, user_id: UUID) -> List[FinancialGoal]:
    return db.query(FinancialGoal).filter(FinancialGoal.user_id == user_id).all()


def get_goal(db: Session, goal_id: UUID) -> Optional[FinancialGoal]:
    return db.query(FinancialGoal).filter(FinancialGoal.goal_id == goal_id).first()


def create_goal(db: Session, goal_in: FinancialGoalCreate) -> FinancialGoal:
    goal = FinancialGoal(**goal_in.dict())
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


def update_goal(
    db: Session, goal_id: UUID, goal_in: FinancialGoalUpdate
) -> Optional[FinancialGoal]:
    goal = get_goal(db, goal_id)
    if not goal:
        return None
    for field, value in goal_in.dict(exclude_unset=True).items():
        setattr(goal, field, value)
    db.commit()
    db.refresh(goal)
    return goal


def delete_goal(db: Session, goal_id: UUID) -> bool:
    goal = get_goal(db, goal_id)
    if not goal:
        return False
    db.delete(goal)
    db.commit()
    return True
