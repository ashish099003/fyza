from fastapi import FastAPI, Depends, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.models import Base
from backend.schemas import UserProfileCreate, UserProfileResponse
from backend.crud import get_user_profile, create_user_profile, update_user_profile
from backend.dependencies import engine, get_db
from backend.profile.financialgoals.api_router import api_router

# Initialize tables (creates tables if they don't exist)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS MIDDLEWARE (allow requests from your frontend during dev) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set this to your frontend URL for better security!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Register all API routers (financial goals etc.) ---
app.include_router(api_router)

# --- User Profile Endpoints ---

@app.get(
    "/api/profile/{user_id}",
    response_model=UserProfileResponse,
    summary="Fetch a user profile"
)
def read_profile(
    user_id: int = Path(..., description="ID of the user"),
    db: Session = Depends(get_db)
):
    db_profile = get_user_profile(db, user_id)
    if not db_profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return db_profile

@app.post(
    "/api/profile",
    response_model=UserProfileResponse,
    summary="Create a new user profile"
)
def create_profile(
    profile_in: UserProfileCreate,
    db: Session = Depends(get_db)
):
    return create_user_profile(db, profile_in)

@app.put(
    "/api/profile/{user_id}",
    response_model=UserProfileResponse,
    summary="Update an existing user profile"
)
def update_profile(
    user_id: int = Path(..., description="ID of the user to update"),
    profile_in: UserProfileCreate = ...,
    db: Session = Depends(get_db)
):
    updated = update_user_profile(db, user_id, profile_in)
    if not updated:
        raise HTTPException(status_code=404, detail="User profile not found")
    return updated
