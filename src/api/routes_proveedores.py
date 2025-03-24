from flask import Blueprint, request, jsonify
from api.models import db, Proveedor
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime

proveedores_bp = Blueprint('proveedores_bp', __name__)

# Autenticar proveedor mediante correo electrónico y contraseña
@proveedores_bp.route('/proveedores/autenticar', methods=['POST'])
def autenticar_proveedor():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

        proveedor = Proveedor.query.filter_by(contacto=email).first()
        if not proveedor or not check_password_hash(proveedor.password, password):
            return jsonify({"error": "Correo o contraseña inválidos"}), 401

        expiration = datetime.timedelta(hours=48)  # Validez de 48 horas
        access_token = create_access_token(identity=proveedor.id, expires_delta=expiration)

        return jsonify({"message": "Autenticación exitosa", "token": access_token}), 200
    except Exception as e:
        return jsonify({"error": f"Error al autenticar proveedor: {str(e)}"}), 500

# Obtener todos los proveedores
@proveedores_bp.route('/proveedores', methods=['GET'])
#@jwt_required()
def obtener_proveedores():
    try:
        print("Obteniendo proveedores...")  # Log para depuración
        proveedores = Proveedor.query.all()
        if not proveedores:
            return jsonify({"message": "No hay proveedores disponibles"}), 200
        return jsonify([proveedor.serialize() for proveedor in proveedores]), 200
    except Exception as e:
        print(f"Error en obtener_proveedores: {e}")  # Log del error
        return jsonify({"error": f"Error al obtener proveedores: {str(e)}"}), 500

# Obtener un proveedor por su ID
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['GET'])
#@jwt_required()
def obtener_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404
        return jsonify(proveedor.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener proveedor: {str(e)}"}), 500

# Crear un nuevo proveedor
@proveedores_bp.route('/proveedores', methods=['POST'])
def crear_proveedor():
    try:
        data = request.get_json()

        if not data.get('nombre_proveedor') or not data.get('contacto') or not data.get('password'):
            return jsonify({"error": "Faltan datos obligatorios"}), 400

        nuevo_proveedor = Proveedor(
            nombre_proveedor=data['nombre_proveedor'],
            contacto=data['contacto'],
            website=data.get('website'),
            password=generate_password_hash(data['password'])
        )
        db.session.add(nuevo_proveedor)
        db.session.commit()
        return jsonify(nuevo_proveedor.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Error al crear proveedor: {str(e)}"}), 500

# Eliminar un proveedor
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['DELETE'])
#@jwt_required()
def eliminar_proveedor(proveedor_id):
    try:
        current_user_id = get_jwt_identity()
        proveedor = Proveedor.query.get(proveedor_id)

        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404

        if proveedor.id != current_user_id:
            return jsonify({"error": "No tienes permiso para eliminar este proveedor"}), 403

        db.session.delete(proveedor)
        db.session.commit()
        return jsonify({"message": "Proveedor eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar proveedor: {str(e)}"}), 500

# Actualizar un proveedor
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['PUT', 'PATCH'])
#@jwt_required()
def actualizar_proveedor(proveedor_id):
    try:
        current_user_id = get_jwt_identity()
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404

        if proveedor.id != current_user_id:
            return jsonify({"error": "No tienes permiso para actualizar este proveedor"}), 403

        data = request.get_json()
        if "nombre_proveedor" in data:
            proveedor.nombre_proveedor = data["nombre_proveedor"]
        if "contacto" in data:
            proveedor.contacto = data["contacto"]
        if "website" in data:
            proveedor.website = data["website"]
        if "password" in data:
            proveedor.password = generate_password_hash(data["password"])

        db.session.commit()
        return jsonify(proveedor.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al actualizar proveedor: {str(e)}"}), 500
