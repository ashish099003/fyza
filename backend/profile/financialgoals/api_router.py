# backend/api/api_router.py
from fastapi import APIRouter

from backend.profile.financialgoals.api import router as financial_goals_router

api_router = APIRouter()
api_router.include_router(financial_goals_router)
