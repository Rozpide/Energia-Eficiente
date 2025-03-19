from flask import Blueprint, request, jsonify
from api.models import db, User

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/users', methods=['GET'])
def obtener_usuarios():
    """
    Obtener todos los usuarios.
    """
    usuarios = User.query.all()
    return jsonify([usuario.serialize() for usuario in usuarios]), 200


@users_bp.route('/users/<int:user_id>', methods=['GET'])
def obtener_usuario(user_id):
    """
    Obtener un usuario específico por su ID.
    """
    usuario = User.query.get(user_id)
    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(usuario.serialize()), 200


@users_bp.route('/users', methods=['POST'])
def crear_usuario():
    """
    Crear un nuevo usuario.
    """
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Faltan datos obligatorios (email, password)"}), 400

    nuevo_usuario = User(
        email=data['email'],
        password=data['password'],
        is_active=data.get('is_active', True),  # Por defecto activo
        name=data.get('name')
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify(nuevo_usuario.serialize()), 201


@users_bp.route('/users/<int:user_id>', methods=['PATCH'])
def actualizar_usuario(user_id):
    """
    Actualizar los datos de un usuario por su ID.
    """
    usuario = User.query.get(user_id)
    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    if "email" in data:
        usuario.email = data["email"]
    if "password" in data:
        usuario.password = data["password"]
    if "is_active" in data:
        usuario.is_active = data["is_active"]
    if "name" in data:
        usuario.name = data["name"]

    db.session.commit()
    return jsonify(usuario.serialize()), 200

@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
def eliminar_usuario(user_id):
    usuario = User.query.get(user_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado correctamente"}), 200


@users_bp.route('/users/<int:user_id>', methods=['PATCH'])
def actualizar_usuario(user_id):
    usuario = User.query.get(user_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    if "email" in data:
        usuario.email = data["email"]
    if "password" in data:
        usuario.password = data["password"]
    if "name" in data:
        usuario.name = data["name"]
    if "is_active" in data:
        usuario.is_active = data["is_active"]

    db.session.commit()
    return jsonify(usuario.serialize()), 200



@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
def eliminar_usuario(user_id):
    """
    Eliminar un usuario por su ID.
    """
    usuario = User.query.get(user_id)
    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado exitosamente"}), 200
