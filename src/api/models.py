from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import Integer, String, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(80))
    is_active: Mapped[bool]
    note: Mapped["Notes"] = relationship(back_populates="user")
    habit: Mapped["Habits"] = relationship(back_populates="user")
    goal: Mapped["Goals"] = relationship(back_populates="user")
    project: Mapped["Projects"] = relationship(back_populates="user")

    def serialize(self):
        
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active
        }

class Notes(db.Model):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(2000), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="notes")
    project: Mapped["Projects"] = relationship(back_populates="notes")

    def serialize(self):
        
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
        }
    
class Habits(db.Model):
    __tablename__ = "habits"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    ready: Mapped[bool]
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="habits")
    goal: Mapped["Goals"] = relationship(back_populates="habits")
    project: Mapped["Projects"] = relationship(back_populates="habits")

    def serialize(self):
        
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ready": self.ready
        }

class Goals(db.Model):
    __tablename__ = "goals"

    id: Mapped[int] = mapped_column(primary_key=True)
    target: Mapped[str] = mapped_column(String(500), nullable=False)
    ready: Mapped[bool]
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="goals")
    habits_id: Mapped[int] = mapped_column(ForeignKey("habits.id"))
    habits: Mapped["Habits"] = relationship(back_populates="goals")
    project: Mapped["Projects"] = relationship(back_populates="goals")

    def serialize(self):
        
        return {
            "id": self.id,
            "target": self.target
        }

class Projects(db.Model):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(1500), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="projects")
    notes_id: Mapped[int] = mapped_column(ForeignKey("notes.id"))
    notes: Mapped["Notes"] = relationship(back_populates="projects")
    habits_id: Mapped[int] = mapped_column(ForeignKey("habits.id"))
    habits: Mapped["Habits"] = relationship(back_populates="projects")
    goals_id: Mapped[int] = mapped_column(ForeignKey("goals.id"))
    goals: Mapped["Goals"] = relationship(back_populates="projects")

    def serialize(self):
        
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }