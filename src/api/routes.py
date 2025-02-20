from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Doctor, Administrator, Appointment, Availability, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)
CORS(api)

# Ruta de ejemplo
@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! This message comes from the backend. Check the network tab in your browser to see the GET request."
    }
    return jsonify(response_body), 200

# Endpoints para el modelo User
@api.route('/User', methods=['GET'])
def get_User():
    try:
        User = User.query.all()
        return jsonify([user.serialize() for user in User]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/User', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            password=data.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Doctor
@api.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors = Doctor.query.all()
        return jsonify([doctor.serialize() for doctor in doctors]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/doctors', methods=['POST'])
def create_doctor():
    data = request.get_json()
    try:
        new_doctor = Doctor(
            name=data.get('name'),
            email=data.get('email'),
            specialty=data.get('specialty'),
            password=data.get('password')
        )
        db.session.add(new_doctor)
        db.session.commit()
        return jsonify(new_doctor.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Post
@api.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        return jsonify([post.serialize() for post in posts]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    try:
        # Convertir la fecha de string a objeto date (formato 'YYYY-MM-DD')
        date_str = data.get('date')
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None

        new_post = Post(
            user_id=data.get('user_id'),
            date=date_obj,
            content=data.get('content')
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Appointment
@api.route('/appointments', methods=['GET'])
def get_appointments():
    try:
        appointments = Appointment.query.all()
        return jsonify([appointment.serialize() for appointment in appointments]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    try:
        # Convertir fecha y hora de string a objetos date y time
        date_str = data.get('date')
        time_str = data.get('time')
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
        time_obj = datetime.strptime(time_str, '%H:%M:%S').time() if time_str else None

        new_appointment = Appointment(
            user_id=data.get('user_id'),
            doctor_id=data.get('doctor_id'),
            date=date_obj,
            time=time_obj,
            status=data.get('status')
        )
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify(new_appointment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Availability
@api.route('/availabilities', methods=['GET'])
def get_availabilities():
    try:
        availabilities = Availability.query.all()
        return jsonify([availability.serialize() for availability in availabilities]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/availabilities', methods=['POST'])
def create_availability():
    data = request.get_json()
    try:
        # Convertir start_time y end_time de string a objeto time (formato 'HH:MM:SS')
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')
        start_time_obj = datetime.strptime(start_time_str, '%H:%M:%S').time() if start_time_str else None
        end_time_obj = datetime.strptime(end_time_str, '%H:%M:%S').time() if end_time_str else None

        new_availability = Availability(
            doctor_id=data.get('doctor_id'),
            day=data.get('day'),
            start_time=start_time_obj,
            end_time=end_time_obj
        )
        db.session.add(new_availability)
        db.session.commit()
        return jsonify(new_availability.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Administrator
@api.route('/administrators', methods=['GET'])
def get_administrators():
    try:
        administrators = Administrator.query.all()
        return jsonify([admin.serialize() for admin in administrators]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/administrators', methods=['POST'])
def create_administrator():
    data = request.get_json()
    try:
        new_admin = Administrator(
            name=data.get('name'),
            email=data.get('email'),
            password=data.get('password')
        )
        db.session.add(new_admin)
        db.session.commit()
        return jsonify(new_admin.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
