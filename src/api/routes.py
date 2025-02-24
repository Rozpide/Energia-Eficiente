import os
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, User, Doctor, Administrator, Appointment, Availability, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS # type: ignore
from datetime import datetime  
# from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt  
from flask_jwt_extended import JWTManager, create_access_token,jwt_required,get_jwt_identity  
from datetime import timedelta

app=Flask(__name__)
api = Blueprint('api', __name__) 

CORS(api) 


#Encriptacion JWT---- 
app.config["JWT_SECRET_KEY"]=os.getenv('JWT_SECRET_KEY_OWN')  
app.config["JWT_TOKEN_LOCATION"] = ["headers"]  


bcrypt = Bcrypt(app)  
jwt = JWTManager(app)  

# db = SQLAlchemy(app)

# Ruta de ejemplo
@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! This message comes from the backend. Check the network tab in your browser to see the GET request."
    }
    return jsonify(response_body), 200

# Endpoints para el modelo User
@api.route('/user', methods=['GET'])
def get_User():
    try:
        user = User.query.all()
        return jsonify([user.serialize() for user in user]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        # Validación de campos requeridos
        if not data.get('email') or not data.get('name') or not data.get('password'):
            return jsonify({'error': 'Email, password, and name are required.'}), 400
        
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409
        
        # Hash de la contraseña
        password_hash = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        
        # Crear nuevo usuario
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            password=password_hash
        )

        # Guardar usuario en la base de datos
        db.session.add(new_user)
        db.session.commit()

        # Datos a retornar (sin contraseña por seguridad)
        ok_to_share = {
            "id": new_user.user_id,
            "name": new_user.name,
            "email": new_user.email
        }

        return jsonify({"Usuario Creado": ok_to_share}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    

#Generador de Token Usuario  
@api.route('/logIn',methods=['POST']) 
def get_token_usuario(): 
    try:  
        name=request.json.get('name')
        email = request.json.get('email') 
        password = request.json.get('password')
     
        if not email or not password or  not name: 
            return jsonify({'error': 'Email,name, password are required'}), 400 

        login_user = User.query.filter_by(email=email).first() 

        if not login_user: 
            return jsonify({'error': 'Invalid email.'}), 404   
        
        password_from_db = login_user.password 
        true_o_false = bcrypt.check_password_hash(password_from_db, password)  

        if true_o_false: 
            expires = timedelta(days=1) 
            user_id = login_user.user_id 
            access_token = create_access_token(identity=user_id, expires_delta=expires) 
            return jsonify({'access_token': access_token}), 200 
        else: 
            return jsonify({"Error": "Contraseña incorrecta"}), 404

    except Exception as e: 
        return jsonify({'Error': 'El email proporcionado no corresponde a ninguno registrado: ' + str(e)}), 500   

#Ruta restringida por Token Usuario 
@app.route('/users2') 
@jwt_required() 
def show_users(): 
    current_user_id= get_jwt_identity() 
    if current_user_id: 
        users=User.query.all() 
        user_list=[] 
        for user in users: 
            user_dict={ 
                'id':user.id, 
                'email':user.email
            }
            user_list.append(user_dict) 
        return jsonify(user_list),200 
    else: 
        return{"Error":"Token invalido"},401

    


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
        if not new_doctor.email or not new_doctor.name: 
            return jsonify({'error':'Email,password and Name are requeired.'}),400 
        
        existing_doctor=Doctor.query.filter_by(email=new_doctor.email).first() 
        if existing_doctor: 
            return jsonify({'error':'Email.already exists.'}),409
        
        password_hash=bcrypt.generate_password_hash(new_doctor.password).decode('utf-8')  

        #Ensamblamos usuario nuevo 
        new_created_doctor= Doctor(email=new_doctor.email, password=password_hash, name=new_doctor.name,specialty=new_doctor.specialty)  
        
       
        db.session.add(new_created_doctor)
        db.session.commit() 
        
        ok_to_share={  
           "name": new_created_doctor.name, 
           "email":new_created_doctor.email,
           "id":new_created_doctor.doctor_id, 
           "specialty":new_created_doctor.specialty

          }
         
        return jsonify({"Doctor User Created":ok_to_share}), 201

        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    
    #Generador de Token DOCTOR 
@api.route('/logIn/doctor',methods=['POST']) 
def get_token_doctor(): 
    try:  
     email= request.json.get('email') 
     password= request.json.get('password')
     
     if not email or not password: 
         return jsonify({'error':'Email and password are required'}),400 

     login_doctor=Doctor.query.filter_by(email=request.json['email']).one() 

     if not login_doctor: 
         return jsonify({'error':'Invalid email.'}),404   
     password_from_db=login_doctor.password 
     true_o_false=bcrypt.check_password_hash(password_from_db, password)  

     if true_o_false: 
         expires=timedelta(days=7) 

         doctor_id=login_doctor.doctor_id 
         access_token=create_access_token(identity=doctor_id,expires_delta=expires) 
         return jsonify({'access_token':access_token}),200 
     else: 
         return{"Error":"Contraseña incorrecta"},404

    except Exception as e: 
        return ({'Error':'El email proporcionado no corresponde a ninguno registrado:'+ str(e)}),500  
   
    #Ruta restringida por Token DOCTOR
@app.route('/doctors2') 
@jwt_required() 
def show_doctors(): 
    current_doctor_id= get_jwt_identity() 
    if current_doctor_id: 
        doctors=Doctor.query.all() 
        doctor_list=[] 
        for doctor in doctors: 
            doctor_dict={ 
                'id':doctor.doctor_id, 
                'email':doctor.email
            }
            doctor_list.append(doctor_dict) 
        return jsonify(doctor_list),200 
    else: 
        return{"Error":"Token invalido"},401 


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
        if not new_admin.email or not new_admin.name: 
            return jsonify({'error':'Email,password and Name are requeired.'}),400 
        
        existing_admin=Administrator.query.filter_by(email=new_admin.email).first() 
        if existing_admin: 
            return jsonify({'error':'Email.already exists.'}),409
        
        password_hash=bcrypt.generate_password_hash(new_admin.password).decode('utf-8')  

        #Ensamblamos usuario nuevo 
        new_created_admin= Administrator(email=new_admin.email, password=password_hash, name=new_admin.name)  
        
       
        db.session.add(new_created_admin)
        db.session.commit() 
        
        ok_to_share={  
           "name": new_created_admin.name, 
           "email":new_created_admin.email,
           "id":new_created_admin.admin_id

          }
         
        return jsonify({"Administrator User Created":ok_to_share}), 201
      
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    #Generador de Token ADMIN
@api.route('/logIn/admin',methods=['POST']) 
def get_token_admin(): 
    try: 
     
     email=request.json.get('email') 
     password=request.json.get('password')
     
     if not email or not password: 
         return jsonify({'error':'Email and password are required'}),400 

     login_admin=Administrator.query.filter_by(email=request.json['email']).one() 

     if not login_admin: 
         return jsonify({'error':'Invalid email.'}),404   
     password_from_db=login_admin.password 
     true_o_false=bcrypt.check_password_hash(password_from_db, password)  

     if true_o_false: 
         expires=timedelta(days=1) 

         admin_id=login_admin.admin_id 
         access_token=create_access_token(identity=admin_id,expires_delta=expires) 
         return jsonify({'access_token':access_token}),200 
     else: 
         return{"Error":"Contraseña incorrecta"},404

    except Exception as e: 
        return ({'Error':'El email proporcionado no corresponde a ninguno registrado:'+ str(e)}),500  
   
#     #Ruta restringida por Token Admin
@app.route('/administrators2') 
@jwt_required() 
def show_administrador(): 
    current_admin_id= get_jwt_identity() 
    if current_admin_id: 
        admins=Administrator.query.all() 
        admin_list=[] 
        for admin in admins: 
            admin_dict={ 
                'id':admin.admin_id, 
                'email':admin.email
            }
            admin_list.append(admin_dict) 
        return jsonify(admin_list),200 
    else: 
        return{"Error":"Token invalido"},401 
     

if __name__ == '__main__':
    app.run(debug=True)  
