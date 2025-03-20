from flask import Blueprint, jsonify, request
from api.models import db, TarifaElectrica, Proveedor
from werkzeug.security import check_password_hash

# Creamos el blueprint
tarifa_electrica_bp = Blueprint('tarifa_electrica', __name__)

# Rutas para el CRUD de tarifas eléctricas
@tarifa_electrica_bp.route('/', methods=['GET'])
def get_tarifas():
    """
    Obtener todas las tarifas eléctricas.
    """
    try:
        tarifas = TarifaElectrica.query.all()
        return jsonify([tarifa.serialize() for tarifa in tarifas]), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener tarifas: {str(e)}"}), 500


@tarifa_electrica_bp.route('/', methods=['POST'])
def create_tarifa():
    """
    Crear una nueva tarifa eléctrica (solo proveedores autenticados).
    """
    data = request.get_json()
    proveedor_id = data.get('proveedor_id_fk')
    password = request.headers.get('Proveedor-Password')  # Captura la contraseña de las cabeceras

    # Verificar si las cabeceras requeridas están presentes
    if not proveedor_id or not password:
        return jsonify({"error": "Proveedor-ID y Proveedor-Password son obligatorios"}), 400

    # Verificar si el proveedor está autenticado
    proveedor = Proveedor.query.get(proveedor_id)
    if not proveedor or not check_password_hash(proveedor.password, password):
        return jsonify({"error": "Autenticación fallida"}), 403

    try:
        # Crear una nueva tarifa eléctrica
        nueva_tarifa = TarifaElectrica(
            proveedor_id_fk=proveedor_id,
            registro_hora_fecha_tarifa=data['registro_hora_fecha_tarifa'],
            precio_kw_hora=data['precio_kw_hora'],
            region=data['region'],
            carbon_impact_kgCO=data['carbon_impact_kgCO'],
            nombre_tarifa=data['nombre_tarifa'],
            rango_horario_bajo=data.get('rango_horario_bajo')  # Campo opcional
        )
        db.session.add(nueva_tarifa)
        db.session.commit()
        return jsonify(nueva_tarifa.serialize()), 201
    except KeyError as e:
        return jsonify({"error": f"Falta un campo obligatorio: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error al crear tarifa: {str(e)}"}), 500


@tarifa_electrica_bp.route('/<int:tarifa_id>', methods=['PUT'])
def update_tarifa(tarifa_id):
    """
    Actualizar una tarifa eléctrica (solo proveedores autenticados y propietarios).
    """
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404

    data = request.get_json()
    proveedor_id = data.get('proveedor_id_fk')
    password = data.get('password')

    # Verificar si el proveedor está autenticado
    proveedor = Proveedor.query.get(proveedor_id)
    if not proveedor or not check_password_hash(proveedor.password, password):
        return jsonify({"error": "Autenticación fallida"}), 403

    # Verificar si el proveedor es propietario de la tarifa
    if tarifa.proveedor_id_fk != int(proveedor_id):
        return jsonify({"error": "No tienes permiso para actualizar esta tarifa"}), 403

    try:
        # Actualizar los datos de la tarifa
        tarifa.proveedor_id_fk = proveedor_id
        tarifa.registro_hora_fecha_tarifa = data['registro_hora_fecha_tarifa']
        tarifa.precio_kw_hora = data['precio_kw_hora']
        tarifa.region = data['region']
        tarifa.carbon_impact_kgCO = data['carbon_impact_kgCO']
        tarifa.nombre_tarifa = data['nombre_tarifa']
        tarifa.rango_horario_bajo = data.get('rango_horario_bajo')
        db.session.commit()
        return jsonify(tarifa.serialize()), 200
    except KeyError as e:
        return jsonify({"error": f"Falta un campo obligatorio: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error al actualizar tarifa: {str(e)}"}), 500


@tarifa_electrica_bp.route('/<int:tarifa_id>', methods=['DELETE'])
def delete_tarifa(tarifa_id):
    """
    Eliminar una tarifa eléctrica (solo proveedores autenticados y propietarios).
    """
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404

    proveedor_id = request.headers.get('Proveedor-ID')
    password = request.headers.get('Proveedor-Password')

    # Verificar si el proveedor está autenticado
    proveedor = Proveedor.query.get(proveedor_id)
    if not proveedor or not check_password_hash(proveedor.password, password):
        return jsonify({"error": "Autenticación fallida"}), 403

    # Verificar si el proveedor es propietario de la tarifa
    if tarifa.proveedor_id_fk != int(proveedor_id):
        return jsonify({"error": "No tienes permiso para eliminar esta tarifa"}), 403

    try:
        db.session.delete(tarifa)
        db.session.commit()
        return jsonify({"message": "Tarifa eliminada correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar tarifa: {str(e)}"}), 500
