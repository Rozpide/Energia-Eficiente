from flask import Blueprint, jsonify, request
from api.models import db, TarifaElectrica, Proveedor

# Creamos el blueprint
tarifa_electrica_bp = Blueprint('tarifa_electrica', __name__)

# Rutas para el CRUD de tarifas eléctricas
@tarifa_electrica_bp.route('/', methods=['GET'])
def get_tarifas():
    tarifas = TarifaElectrica.query.all()
    return jsonify([tarifa.serialize() for tarifa in tarifas]), 200

@tarifa_electrica_bp.route('/', methods=['POST'])
def create_tarifa():
    data = request.get_json()
    nueva_tarifa = TarifaElectrica(
        proveedor_id_fk=data['proveedor_id_fk'],
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

@tarifa_electrica_bp.route('/<int:tarifa_id>', methods=['PUT'])
def update_tarifa(tarifa_id):
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404
    data = request.get_json()
    tarifa.proveedor_id_fk = data['proveedor_id_fk']
    tarifa.registro_hora_fecha_tarifa = data['registro_hora_fecha_tarifa']
    tarifa.precio_kw_hora = data['precio_kw_hora']
    tarifa.region = data['region']
    tarifa.carbon_impact_kgCO = data['carbon_impact_kgCO']
    tarifa.nombre_tarifa = data['nombre_tarifa']
    tarifa.rango_horario_bajo = data.get('rango_horario_bajo')
    db.session.commit()
    return jsonify(tarifa.serialize()), 200

@tarifa_electrica_bp.route('/<int:tarifa_id>', methods=['DELETE'])
def delete_tarifa(tarifa_id):
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404
    db.session.delete(tarifa)
    db.session.commit()
    return jsonify({"message": "Tarifa eliminada correctamente"}), 200
