from sqlalchemy.orm import Session
from backend.models import UserProfile
from backend.schemas import UserProfileCreate

def get_user_profile(db: Session, user_id: int):
    return db.query(UserProfile).filter(UserProfile.id == user_id).first()

def create_user_profile(db: Session, data: UserProfileCreate):
    db_profile = UserProfile(**data.dict())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def update_user_profile(db: Session, user_id: int, data: UserProfileCreate):
    db_profile = get_user_profile(db, user_id)
    if not db_profile:
        return None
    for field, value in data.dict().items():
        setattr(db_profile, field, value)
    db.commit()
    db.refresh(db_profile)
    return db_profile
