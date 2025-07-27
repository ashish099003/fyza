from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ---- Import all your routers ----
# Backend routers
from backend.profile.financialgoals.api_router import api_router as financial_goals_router
from backend.crud import get_user_profile, create_user_profile, update_user_profile
from backend.schemas import UserProfileCreate, UserProfileResponse
from backend.dependencies import get_db, engine
from backend.models import Base

# Services routers
from services.insights.finance_agent.routes import router as finance_agent_router
from services.insights.stock_analysis.routes import router as stock_router

# If you have these, add them too
# from services.auth.routes import router as auth_router
# from services.ingestion.routes import router as ingestion_router

from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, Path

# --- Initialize tables (if using SQLAlchemy) ---
Base.metadata.create_all(bind=engine)

# ---- Initialize app ----
app = FastAPI(title="Fyza Backend and Services")

# ---- CORS ----
origins = [
    "http://localhost:5173",
    "https://frontend-ui-kvo42ojzra-uc.a.run.app",
    "*"  # Remove this in production
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Include all routers ----
app.include_router(financial_goals_router)
app.include_router(finance_agent_router)
app.include_router(stock_router)
# app.include_router(auth_router)
# app.include_router(ingestion_router)

# ---- User Profile Endpoints ----
@app.get("/api/profile/{user_id}", response_model=UserProfileResponse, summary="Fetch a user profile")
def read_profile(user_id: int = Path(..., description="ID of the user"), db: Session = Depends(get_db)):
    db_profile = get_user_profile(db, user_id)
    if not db_profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return db_profile

@app.post("/api/profile", response_model=UserProfileResponse, summary="Create a new user profile")
def create_profile(profile_in: UserProfileCreate, db: Session = Depends(get_db)):
    return create_user_profile(db, profile_in)

@app.put("/api/profile/{user_id}", response_model=UserProfileResponse, summary="Update an existing user profile")
def update_profile(
    user_id: int = Path(..., description="ID of the user to update"),
    profile_in: UserProfileCreate = ...,
    db: Session = Depends(get_db)
):
    updated = update_user_profile(db, user_id, profile_in)
    if not updated:
        raise HTTPException(status_code=404, detail="User profile not found")
    return updated

# ---- Health Check (optional) ----
@app.get("/health")
def health_check():
    return {"status": "ok"}
