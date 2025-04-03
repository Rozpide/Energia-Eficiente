from flask import Blueprint, jsonify, request
from api.models import db, TarifaElectrica
import json
from datetime import datetime

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
            return jsonify([]), 200
        return jsonify([tarifa.serialize() for tarifa in tarifas]), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener tarifas: {str(e)}"}), 500

@tarifa_electrica_bp.route('/tarifas', methods=['POST'])
def crear_tarifa():
    try:
        # Recibir datos de la solicitud
        data = request.get_json()

        # Validar los datos obligatorios
        required_fields = ['proveedor_id_fk', 'precio_kw_hora', 'region', 'carbon_impact_kgCO', 'nombre_tarifa']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"message": f"El campo {field} es obligatorio."}), 400

        # Procesar zonas geográficas
        zonas_geograficas = data.get('zonas_geograficas')
        latitude, longitude = None, None
        if zonas_geograficas:
            try:
                zonas_geograficas = json.loads(zonas_geograficas)  # Convertir a objeto JSON
                if len(zonas_geograficas) > 0:
                    latitude = zonas_geograficas[0].get('lat')  # Extraer latitud
                    longitude = zonas_geograficas[0].get('lng')  # Extraer longitud
                zonas_geograficas = json.dumps(zonas_geograficas)  # Serializar como JSON para guardar
            except ValueError:
                return jsonify({"message": "El formato de zonas_geograficas no es válido"}), 400

        # Crear nueva tarifa eléctrica
        nueva_tarifa = TarifaElectrica(
            proveedor_id_fk=data['proveedor_id_fk'],
            registro_hora_fecha_tarifa=datetime.utcnow(),
            precio_kw_hora=float(data['precio_kw_hora']),
            region=data['region'],
            carbon_impact_kgCO=float(data['carbon_impact_kgCO']),
            nombre_tarifa=data['nombre_tarifa'],
            rango_horario_bajo=data.get('rango_horario_bajo'),
            zonas_geograficas=zonas_geograficas,
            latitude=latitude,  # Asignar latitud extraída
            longitude=longitude  # Asignar longitud extraída
        )

        # Guardar en la base de datos
        db.session.add(nueva_tarifa)
        db.session.commit()
        return jsonify(nueva_tarifa.serialize()), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error interno del servidor: {e}")
        return jsonify({"message": "Error interno del servidor", "details": str(e)}), 500
    
@tarifa_electrica_bp.route('/tarifas/<int:tarifa_id>', methods=['PUT'])
def actualizar_tarifa(tarifa_id):
    print(f"Solicitud recibida en actualizar_tarifa para tarifa_id: {tarifa_id}")
    tarifa = TarifaElectrica.query.get(tarifa_id)
    if not tarifa:
        return jsonify({"error": "Tarifa no encontrada"}), 404

    try:
        data = request.get_json()
        # Solo actualiza registro_hora_fecha_tarifa si está presente en los datos
        tarifa.registro_hora_fecha_tarifa = data.get('registro_hora_fecha_tarifa', tarifa.registro_hora_fecha_tarifa)
        tarifa.precio_kw_hora = data['precio_kw_hora']
        tarifa.region = data['region']
        tarifa.carbon_impact_kgCO = data['carbon_impact_kgCO']
        tarifa.nombre_tarifa = data['nombre_tarifa']
        tarifa.rango_horario_bajo = data.get('rango_horario_bajo')

        # Actualizar latitud y longitud a partir de zonas_geograficas si están disponibles
        zonas_geograficas = data.get('zonas_geograficas')
        if zonas_geograficas:
            try:
                zonas_geograficas = json.loads(zonas_geograficas)
                if len(zonas_geograficas) > 0:
                    tarifa.latitude = zonas_geograficas[0].get('lat')  # Actualizar latitud
                    tarifa.longitude = zonas_geograficas[0].get('lng')  # Actualizar longitud
                tarifa.zonas_geograficas = json.dumps(zonas_geograficas)
            except ValueError:
                return jsonify({"message": "El formato de zonas_geograficas no es válido"}), 400

        db.session.commit()
        return jsonify(tarifa.serialize()), 200
    except KeyError as e:
        return jsonify({"error": f"Falta un campo obligatorio: {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
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
