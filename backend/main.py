from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlmodel import Session, select, create_engine

from models import User, Trip, SQLModel


DATABASE_URL = "sqlite:///./backend.db"
SECRET_KEY = "change-this-secret-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_user_by_username(username: str) -> Optional[User]:
    with Session(engine) as session:
        statement = select(User).where(User.username == username)
        return session.exec(statement).first()


def authenticate_user(username: str, password: str) -> Optional[User]:
    user = get_user_by_username(username)
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(username)
    if user is None:
        raise credentials_exception
    return user


app = FastAPI(title="EcoTracker - Backend (dev)")

# Allow CORS for local frontend during development (adjust in production)
app.add_middleware(
    CORSMiddleware,
    # Durante desarrollo permitir todos los orígenes para evitar problemas de CORS.
    # En producción, restringir a los orígenes de la app frontend.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Transport CO2 factors (kg CO2 per km)
TRANSPORT_CO2 = {
    "coche": 0.192,
    "bus": 0.089,
    "metro": 0.041,
    "tren": 0.041,
    "bici": 0.0,
    "moto": 0.103,
}


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/register")
def register(
    username: str = Form(...), password: str = Form(...), email: Optional[str] = Form(None)
):
    if get_user_by_username(username):
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed = pwd_context.hash(password)
    user = User(username=username, hashed_password=hashed, email=email)
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
    return {"id": user.id, "username": user.username}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": user.username}, access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/trips")
def read_trips(current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        statement = select(Trip).where(Trip.user_id == current_user.id)
        trips = session.exec(statement).all()
    return trips


@app.post("/trips")
def create_trip(
    transport: str = Form(...),
    title: Optional[str] = Form(None),
    start: datetime = Form(...),
    end: datetime = Form(...),
    distance_km: float = Form(0.0),
    notes: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
):
    # Calculate co2 using transport factor
    factor = TRANSPORT_CO2.get(transport, 0.0)
    co2 = factor * float(distance_km or 0)
    trip = Trip(user_id=current_user.id, transport=transport, title=title, start=start, end=end, distance_km=distance_km, co2=co2, notes=notes)
    with Session(engine) as session:
        session.add(trip)
        session.commit()
        session.refresh(trip)
    return trip

@app.get("/food")
def read_food():
    pass  # Implement food logging retrieval similarly to trips


@app.post("/food")
def create_food():
    pass  # Implement food logging similarly to trips