"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SolicitudCambio, Proveedor, TarifaElectrica
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/solicitudes', methods=['POST'])
def crear_solicitud():
    """
    Crear una nueva solicitud de cambio.
    """
    data = request.get_json()
    
    # Verificar que los datos requeridos estén presentes
    if not data.get('user_id') or not data.get('proveedor_actual_id') or not data.get('proveedor_nuevo_id'):
        return jsonify({"error": "Faltan datos obligatorios (user_id, proveedor_actual_id, proveedor_nuevo_id)"}), 400
    
    nueva_solicitud = SolicitudCambio(
        user_id_fk=data['user_id'],
        proveedor_actual_id_fk=data['proveedor_actual_id'],
        tarifa_actual_id_fk=data.get('tarifa_actual_id'),
        proveedor_nuevo_id_fk=data['proveedor_nuevo_id'],
        tarifa_nueva_id_fk=data.get('tarifa_nueva_id'),
        comentario=data.get('comentario')
    )
    db.session.add(nueva_solicitud)
    db.session.commit()
    return jsonify(nueva_solicitud.serialize()), 201

@api.route('/solicitudes', methods=['GET'])
def obtener_solicitudes():
    """
    Obtener todas las solicitudes de cambio.
    """
    solicitudes = SolicitudCambio.query.all()
    return jsonify([solicitud.serialize() for solicitud in solicitudes]), 200

@api.route('/solicitudes/<int:solicitud_id>', methods=['GET'])
def obtener_solicitud(solicitud_id):
    """
    Obtener una solicitud específica por su ID.
    """
    solicitud = SolicitudCambio.query.get(solicitud_id)
    if solicitud is None:
        return jsonify({"error": "Solicitud no encontrada"}), 404
    return jsonify(solicitud.serialize()), 200

@api.route('/solicitudes/<int:solicitud_id>', methods=['PATCH'])
def actualizar_solicitud(solicitud_id):
    """
    Actualizar el estado o los comentarios de una solicitud.
    """
    solicitud = SolicitudCambio.query.get(solicitud_id)
    if solicitud is None:
        return jsonify({"error": "Solicitud no encontrada"}), 404

    data = request.get_json()
    
    if "estado" in data:
        solicitud.estado = data["estado"]
    if "comentario" in data:
        solicitud.comentario = data["comentario"]

    db.session.commit()
    return jsonify(solicitud.serialize()), 200

@api.route('/solicitudes/<int:solicitud_id>', methods=['DELETE'])
def eliminar_solicitud(solicitud_id):
    """
    Eliminar una solicitud por su ID.
    """
    solicitud = SolicitudCambio.query.get(solicitud_id)
    if solicitud is None:
        return jsonify({"error": "Solicitud no encontrada"}), 404

    db.session.delete(solicitud)
    db.session.commit()
    return jsonify({"message": "Solicitud eliminada exitosamente"}), 200
