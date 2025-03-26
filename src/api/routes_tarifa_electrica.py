
from flask import Blueprint, jsonify, request
from api.models import db, TarifaElectrica

# Creamos el blueprint
tarifa_electrica_bp = Blueprint('tarifa_electrica_bp', __name__)

@tarifa_electrica_bp.route('/tarifas', methods=['GET'])
def listar_tarifas_publicas():
    try:
        tarifas = TarifaElectrica.query.all()
        if not tarifas:
            return jsonify({"message": "No hay tarifas disponibles."}), 200

        return jsonify([tarifa.serialize() for tarifa in tarifas]), 200
    except Exception as e:
        return jsonify({"error": f"Error al listar tarifas: {str(e)}"}), 500

@tarifa_electrica_bp.route('/proveedores/<int:proveedor_id>/tarifas', methods=['GET'])
def obtener_tarifas_por_proveedor(proveedor_id):
    try:
        tarifas = TarifaElectrica.query.filter_by(proveedor_id_fk=proveedor_id).all()
        if not tarifas:
            # Devuelve un array vacío en lugar de un mensaje
            return jsonify([]), 200
        return jsonify([tarifa.serialize() for tarifa in tarifas]), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener tarifas: {str(e)}"}), 500

@tarifa_electrica_bp.route('/tarifas', methods=['POST'])
def crear_tarifa():
    try:
        data = request.get_json()
        
        print("Datos recibidos del frontend:", data)

        nueva_tarifa = TarifaElectrica(
            proveedor_id_fk=data['proveedor_id_fk'],
            registro_hora_fecha_tarifa=data['registro_hora_fecha_tarifa'],
            precio_kw_hora=data['precio_kw_hora'],
            region=data['region'],
            carbon_impact_kgCO=data['carbon_impact_kgCO'],
            nombre_tarifa=data['nombre_tarifa'],
            rango_horario_bajo=data.get('rango_horario_bajo')
        )
        db.session.add(nueva_tarifa)
        db.session.commit()
        return jsonify(nueva_tarifa.serialize()), 201
    except KeyError as e:
        return jsonify({"error": f"Falta un campo obligatorio: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error al crear tarifa: {str(e)}"}), 500

@tarifa_electrica_bp.route('/tarifas/<int:tarifa_id>', methods=['PUT'])
def actualizar_tarifa(tarifa_id):
    print(f"Solicitud recibida en actualizar_tarifa para tarifa_id: {tarifa_id}")
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404

    try:
        data = request.get_json()
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

@tarifa_electrica_bp.route('/tarifas/<int:tarifa_id>', methods=['DELETE'])
def eliminar_tarifa(tarifa_id):
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404

    try:
        db.session.delete(tarifa)
        db.session.commit()
        return jsonify({"message": "Tarifa eliminada correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error al eliminar tarifa: {str(e)}"}), 500
