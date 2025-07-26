from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# match your existing URL in main.py
SQLALCHEMY_DATABASE_URL = "postgresql://fyza_user:fyza_user@localhost:5432/fyzadb"

# Engine & session factory
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Yields a SQLAlchemy Session, closing it after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
