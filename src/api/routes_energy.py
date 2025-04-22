from flask import Blueprint, request, jsonify
from api.models import db, UserConsumption # Asegúrate de que esté bien conectado con tu modelo de base de datos
from api.services.aiServices import getEnergyAdvice  # Asegúrate de que este servicio esté implementado correctamente

energy_bp = Blueprint('energy_bp', __name__)

# 📌 Endpoint para obtener recomendaciones energéticas
@energy_bp.route('/energy-advice', methods=['POST'])
def energy_advice():
    try:
        data = request.get_json()
        user_id = data.get('userId')

        if not user_id:
            return jsonify({"error": "ID de usuario requerido"}), 400

        advice = getEnergyAdvice(user_id)
        return jsonify({"advice": "No hay suficientes datos de consumo para generar recomendaciones."}), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener recomendaciones: {str(e)}"}), 500
@energy_bp.route('/validate-consumption', methods=['GET'])
def validate_consumption():
    try:
        user_id = request.args.get('userId')  # Obtiene el ID del usuario desde la URL
        if not user_id:
            return jsonify({"error": "ID de usuario requerido"}), 400

        # Verifica si existen datos para este usuario
        records = UserConsumption.query.filter_by(user_id_fk=user_id).all()

        if not records:
            return jsonify({"hasData": False}), 200

        return jsonify({"hasData": True}), 200
    except Exception as e:
        return jsonify({"error": f"Error al validar datos de consumo: {str(e)}"}), 500
