
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Location of our SQLite database file
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# Create the database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create database sessions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for database models
Base = declarative_base()