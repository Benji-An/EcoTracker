from sqlmodel import Session, select
from main import create_db_and_tables, engine, pwd_context
from models import User


def init():
    create_db_and_tables()
    with Session(engine) as session:
        statement = select(User)
        some = session.exec(statement).first()
        if some is None:
            user = User(username="test", hashed_password=pwd_context.hash("testpass"))
            session.add(user)
            session.commit()
            print("Created test user: test / testpass")
        else:
            print("Users already exist in DB")


if __name__ == "__main__":
    init()
