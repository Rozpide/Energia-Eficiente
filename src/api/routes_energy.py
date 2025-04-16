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
        return jsonify({"advice": advice}), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener recomendaciones: {str(e)}"}), 500
