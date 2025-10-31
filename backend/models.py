from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, nullable=False)
    hashed_password: str
    email: Optional[str] = None

    trips: List["Trip"] = Relationship(back_populates="user")


class Trip(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    title: str
    transport: Optional[str] = None
    title: Optional[str] = None
    start: datetime
    end: datetime
    distance_km: float = 0.0
    co2: float = 0.0
    notes: Optional[str] = None

    user: Optional[User] = Relationship(back_populates="trips")
