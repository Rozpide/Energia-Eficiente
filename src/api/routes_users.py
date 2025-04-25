


from flask import Blueprint, request, jsonify
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import datetime

users_bp = Blueprint('users_bp', __name__)

# Autenticar usuario mediante correo electrónico y contraseña
@users_bp.route('/users/autenticar', methods=['POST'])
def autenticar_usuario():
    try:
        data = request.get_json()
        print(f'Datos recibidos: {data}')
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            print(f'Error: Faltan datos. Email: {email}, Password: {password}')
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()
        print(f'Usuario encontrado: {user}')

        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Correo o contraseña inválidos"}), 401

        expiration = datetime.timedelta(hours=48)  # Validez de 48 horas
        access_token = create_access_token(identity=user.id, expires_delta=expiration)

        # Incluye el ID del usuario en la respuesta
        return jsonify({"message": "Autenticación exitosa", "token": access_token, "userId": user.id}), 200
    except Exception as e:
        return jsonify({"error": f"Error al autenticar usuario: {str(e)}"}), 500

# Obtener todos los usuarios
@users_bp.route('/users', methods=['GET'])
#@jwt_required()
def obtener_usuarios():
    try:
        print("Obteniendo usuarios...")  # Log para depuración
        usuarios = User.query.all()
        if not usuarios:
            return jsonify({"message": "No hay usuarios disponibles"}), 200
        return jsonify([usuario.serialize() for usuario in usuarios]), 200
    except Exception as e:
        print(f"Error en obtener_usuarios: {e}")  # Log del error
        return jsonify({"error": f"Error al obtener usuarios: {str(e)}"}), 500

# Obtener un usuario por su ID
@users_bp.route('/users/<int:user_id>', methods=['GET'])
#@jwt_required()
def obtener_usuario(user_id):
    try:
        usuario = User.query.get(user_id)
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        return jsonify(usuario.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener usuario: {str(e)}"}), 500

# Crear un nuevo usuario
@users_bp.route('/users', methods=['POST'])
def crear_usuario():
    try:
        data = request.get_json()

        if not data.get('name') or not data.get('email') or not data.get('password'):
            return jsonify({"error": "Faltan datos obligatorios"}), 400

        nuevo_usuario = User(
            name=data['name'],  # Cambiado de 'nombre' a 'name'
            email=data['email'],
            password=generate_password_hash(data['password'])
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify(nuevo_usuario.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Error al crear usuario: {str(e)}"}), 500

# Eliminar un usuario
@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
#@jwt_required()
def eliminar_usuario(user_id):
    try:
        current_user_id = get_jwt_identity()
        usuario = User.query.get(user_id)

        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if usuario.id != current_user_id:
            return jsonify({"error": "No tienes permiso para eliminar este usuario"}), 403

        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar usuario: {str(e)}"}), 500

# Actualizar un usuario
@users_bp.route('/users/<int:user_id>', methods=['PUT', 'PATCH'])
#@jwt_required()
def actualizar_usuario(user_id):
    try:
        current_user_id = get_jwt_identity()
        usuario = User.query.get(user_id)
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if usuario.id != current_user_id:
            return jsonify({"error": "No tienes permiso para actualizar este usuario"}), 403

        data = request.get_json()
        if "nombre" in data:
            usuario.nombre = data["nombre"]
        if "email" in data:
            usuario.email = data["email"]
        if "password" in data:
            usuario.password = generate_password_hash(data["password"])

        db.session.commit()
        return jsonify(usuario.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al actualizar usuario: {str(e)}"}), 500


# Endpoint de prueba para verificar la consulta
@users_bp.route('/users/test_query', methods=['GET'])
def test_query():
    try:
        resultado = db.session.execute('SELECT * FROM public."user" LIMIT 1').fetchall()
        print(f'Resultado directo: {resultado}')
        return jsonify({"message": "Consulta ejecutada", "data": [dict(row) for row in resultado]}), 200
    except Exception as e:
        return jsonify({"error": f"Error en la consulta directa: {str(e)}"}), 500






