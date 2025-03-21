from flask import Blueprint, request, jsonify
from api.models import db, Proveedor
from werkzeug.security import generate_password_hash, check_password_hash

proveedores_bp = Blueprint('proveedores_bp', __name__)

# Autenticar proveedor mediante correo electrónico y contraseña
@proveedores_bp.route('/proveedores/autenticar', methods=['POST'])
def autenticar_proveedor():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validar que los campos obligatorios estén presentes
        if not email or not password:
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

        # Verificar si el proveedor existe por su correo electrónico
        proveedor = Proveedor.query.filter_by(contacto=email).first()
        if not proveedor or not check_password_hash(proveedor.password, password):
            return jsonify({"error": "Correo o contraseña inválidos"}), 401

        return jsonify({"message": "Autenticación exitosa", "proveedor_id": proveedor.id}), 200
    except Exception as e:
        return jsonify({"error": f"Error al autenticar proveedor: {str(e)}"}), 500

# Login de proveedor (por ID y contraseña, conserva la funcionalidad original)
@proveedores_bp.route('/login_proveedor', methods=['POST'])
def login_proveedor():
    try:
        data = request.get_json()
        proveedor_id = data.get('proveedorId')
        password = data.get('password')

        # Validar que los campos obligatorios estén presentes
        if not proveedor_id or not password:
            return jsonify({"error": "ID y contraseña son obligatorios"}), 400

        # Verificar si el proveedor existe
        proveedor = Proveedor.query.filter_by(id=proveedor_id).first()
        if not proveedor or not check_password_hash(proveedor.password, password):
            return jsonify({"error": "ID o contraseña inválidos"}), 401

        return jsonify({"message": "Login exitoso", "proveedor_id": proveedor.id}), 200
    except Exception as e:
        return jsonify({"error": f"Error al realizar login: {str(e)}"}), 500

# Obtener todos los proveedores
@proveedores_bp.route('/proveedores', methods=['GET'])
def obtener_proveedores():
    try:
        proveedores = Proveedor.query.all()
        return jsonify([proveedor.serialize() for proveedor in proveedores]), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener proveedores: {str(e)}"}), 500

# Obtener un proveedor por su ID
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['GET'])
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

        # Validar que todos los campos obligatorios estén presentes
        if not data.get('nombre_proveedor') or not data.get('contacto') or not data.get('password'):
            return jsonify({"error": "Faltan datos obligatorios: nombre_proveedor, contacto, password"}), 400

        nuevo_proveedor = Proveedor(
            nombre_proveedor=data['nombre_proveedor'],
            contacto=data['contacto'],
            website=data.get('website'),
            password=generate_password_hash(data['password'])  # Encriptar la contraseña
        )
        db.session.add(nuevo_proveedor)
        db.session.commit()
        return jsonify(nuevo_proveedor.serialize()), 201
    except Exception as e:
        return jsonify({"error": f"Error al crear proveedor: {str(e)}"}), 500

# Eliminar un proveedor por su ID
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['DELETE'])
def eliminar_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404

        db.session.delete(proveedor)
        db.session.commit()
        return jsonify({"message": "Proveedor eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar proveedor: {str(e)}"}), 500

# Actualizar un proveedor por su ID
@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['PUT', 'PATCH'])
def actualizar_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404

        data = request.get_json()
        if "nombre_proveedor" in data:
            proveedor.nombre_proveedor = data["nombre_proveedor"]
        if "contacto" in data:
            proveedor.contacto = data["contacto"]
        if "website" in data:
            proveedor.website = data["website"]
        if "password" in data:  # Si la contraseña se incluye, encriptarla antes de guardar
            proveedor.password = generate_password_hash(data["password"])

        db.session.commit()
        return jsonify(proveedor.serialize()), 200
    except Exception as e:
        return jsonify({"error": f"Error al actualizar proveedor: {str(e)}"}), 500
