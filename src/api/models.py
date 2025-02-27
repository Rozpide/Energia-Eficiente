from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    # Relaciones
    posts = db.relationship('Post', backref='user', lazy=True)
    appointments = db.relationship('Appointment', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email,
        }

class Doctor(db.Model):
    __tablename__ = 'doctor'
    doctor_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    # Relaciones
    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    availabilities = db.relationship('Availability', backref='doctor', lazy=True)

    def __repr__(self):
        return f'<Doctor {self.name}>'

    def serialize(self):
        return {
            "doctor_id": self.doctor_id,
            "name": self.name,
            "email": self.email,
            "specialty": self.specialty,
        }

class Administrator(db.Model):
    __tablename__ = 'administrator'
    admin_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Administrator {self.name}>'

    def serialize(self):
        return {
            "admin_id": self.admin_id,
            "name": self.name,
            "email": self.email,
        }

class Appointment(db.Model):
    __tablename__ = 'appointment'
    appointment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Appointment {self.appointment_id}>'

    def serialize(self):
        return {
            "appointment_id": self.appointment_id,
            "user_id": self.user_id,
            "doctor_id": self.doctor_id,
            "date": self.date.isoformat() if self.date else None,
            "time": self.time.strftime("%H:%M:%S") if self.time else None,
            "status": self.status,
        }

class Availability(db.Model):
    __tablename__ = 'availability'
    availability_id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    day = db.Column(db.String(50), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return f'<Availability {self.availability_id}>'

    def serialize(self):
        return {
            "availability_id": self.availability_id,
            "doctor_id": self.doctor_id,
            "day": self.day,
            "start_time": self.start_time.strftime("%H:%M:%S") if self.start_time else None,
            "end_time": self.end_time.strftime("%H:%M:%S") if self.end_time else None,
        }

class Post(db.Model):
    __tablename__ = 'post'
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Post {self.post_id}>'

    def serialize(self):
        return {
            "post_id": self.post_id,
            "user_id": self.user_id,
            "date": self.date.isoformat() if self.date else None,
            "content": self.content,
        }
