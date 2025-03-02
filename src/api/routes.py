"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .models import Smartphones, TVs
import json

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
    
    images_str = json.dumps(data.get('imagenes', {}))

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
        imagen = images_str
    )
    db.session.add(new_phone)
    db.session.commit()
    return jsonify({"msg": "Phone added"}), 200

@api.route('/phones', methods=['GET'])
def get_users():
    phones = Smartphones.query.all()

    return jsonify([smartphones.serialize() for smartphones in phones]), 200


@api.route('/tvs', methods=['POST'])
def post_tvs():
    data = request.get_json()
    exist = TVs.query.filter_by(modelo=data['modelo']).first()
    if exist:
        return jsonify({"msg": "This TV already exist in your list"}), 400
    
    colores_str = json.dumps(data.get('colores', []))
    
    images_str = json.dumps(data.get('imagenes', {}))

    new_tv = TVs(
        marca = data['marca'],
        contenido_de_la_caja = data['contenido_de_la_caja'],
        modelo = data['modelo'],
        usos_recomendados = data['usos_recomendados'],
        año_modelo = data['año_modelo'],
        fabricante = data['fabricante'],
        precio = data['precio'],
        descripcion = data['descripcion'],
        pantalla = data['pantalla'],
        conectividad = data['conectividad'],
        medidas = data['medidas'],
        colores = colores_str,
        imagen = images_str
    )
    db.session.add(new_tv)
    db.session.commit()
    return jsonify({"msg": "TV added"}), 200

@api.route('/tvs', methods=['GET'])
def get_tvs():
    tvs = TVs.query.all()

    return jsonify([TVs.serialize() for TVs in tvs]), 200