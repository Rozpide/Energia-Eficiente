"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from models import Smartphones, TVs, Laptops

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/phones', methods=['POST'])
def post_phones():
    data = request.get_json()
    exist = Smartphones.query.filter_by(modelo=data['nombre']).first()
    if exist:
        return jsonify({"msg": "This phone already exist in your list"}), 400
    
    colores_str = json.dumps(data.get('colores', []))

    new_phone = Smartphones(
        modelo = data['nombre'],
        pantalla = data['pantalla'],
        procesador = data['procesador'],
        memoria_ram = data['memoria_ram'],
        almacenamiento = data['almacenamiento'],
        camara = data['camara'],
        bateria = data['bateria'],
        precio = data['precio'],
        conectividad = data['conectividad'],
        colores = colores_str,
        descripcion = data['descripcion'],
    )
    db.session.add(new_phone)
    db.session.commit()
    return jsonify({"msg": "Phone added"}), 200

