from flask import Blueprint, request, jsonify
from api.models import db, Proveedor

proveedores_bp = Blueprint('proveedores_bp', __name__)

@proveedores_bp.route('/proveedores', methods=['GET'])
def obtener_proveedores():
    """
    Obtener todos los proveedores.
    """
    proveedores = Proveedor.query.all()
    return jsonify([proveedor.serialize() for proveedor in proveedores]), 200

@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['GET'])
def obtener_proveedor(proveedor_id):
    """
    Obtener un proveedor específico por su ID.
    """
    proveedor = Proveedor.query.get(proveedor_id)
    if not proveedor:
        return jsonify({"error": "Proveedor no encontrado"}), 404
    return jsonify(proveedor.serialize()), 200

@proveedores_bp.route('/proveedores', methods=['POST'])
def crear_proveedor():
    """
    Crear un nuevo proveedor.
    """
    data = request.get_json()
    if not data.get('nombre_proveedor') or not data.get('contacto'):
        return jsonify({"error": "Faltan datos obligatorios (nombre_proveedor, contacto)"}), 400

    nuevo_proveedor = Proveedor(
        nombre_proveedor=data['nombre_proveedor'],
        contacto=data['contacto'],
        website=data.get('website')
    )
    db.session.add(nuevo_proveedor)
    db.session.commit()
    return jsonify(nuevo_proveedor.serialize()), 201

@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['DELETE'])
def eliminar_proveedor(proveedor_id):
    """
    Eliminar un proveedor por su ID.
    """
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"error": "Proveedor no encontrado"}), 404

        db.session.delete(proveedor)
        db.session.commit()
        return jsonify({"message": "Proveedor eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Ocurrió un error: {str(e)}"}), 500

@proveedores_bp.route('/proveedores/<int:proveedor_id>', methods=['PUT','PATCH'])
def actualizar_proveedor(proveedor_id):
    """
    Actualizar los datos de un proveedor por su ID.
    """
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

    db.session.commit()
    return jsonify(proveedor.serialize()), 200

