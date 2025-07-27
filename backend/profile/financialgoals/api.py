# backend/profile/financialgoals/api.py
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from backend.dependencies import get_db
from .schemas import (
    FinancialGoalCreate,
    FinancialGoalUpdate,
    FinancialGoalResponse,
)
from .crud import (
    get_goals_for_user,
    create_goal,
    update_goal,
    delete_goal,
)

router = APIRouter(
    prefix="/api/financial-goals",
    tags=["financial_goals"],
)

@router.get(
    "/{user_id}",
    response_model=List[FinancialGoalResponse],
    summary="List all financial goals for a user",
)
def read_goals_for_user(
        user_id: int, db: Session = Depends(get_db)
):
    return get_goals_for_user(db, user_id)

@router.post(
    "/",
    response_model=FinancialGoalResponse,
    summary="Create a new financial goal",
    operation_id="financial_goals_create",
)
def create_financial_goal(
        goal_in: FinancialGoalCreate, db: Session = Depends(get_db)
):
    return create_goal(db, goal_in)

@router.put(
    "/{goal_id}",
    response_model=FinancialGoalResponse,
    summary="Update an existing financial goal",
    operation_id="financial_goals_update",
)
def update_financial_goal(
        goal_id: UUID,
        goal_in: FinancialGoalUpdate,
        db: Session = Depends(get_db),
):
    updated = update_goal(db, goal_id, goal_in)
    if not updated:
        raise HTTPException(status_code=404, detail="Financial goal not found")
    return updated

@router.delete(
    "/{goal_id}",
    status_code=204,
    summary="Delete a financial goal",
)
def delete_financial_goal(
        goal_id: UUID, db: Session = Depends(get_db)
):
    success = delete_goal(db, goal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Financial goal not found")
    return Response(status_code=204)
