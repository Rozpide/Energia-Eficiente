"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required,verify_jwt_in_request

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def get_users():

    data = db.session.scalars(db.select(User)).all()
    result = list(map(lambda item: item.serialize(),data))
    
    if result == []:
        return jsonify({"msg":"Usuario no encontrado"}), 404

    response_body = {
        "results": result
    }

    return jsonify(response_body), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    try:
        user = db.session.execute(db.select(User).filter_by(id=user_id)).scalar_one()
        return jsonify({"result":user.serialize()}), 200
    except:
        return jsonify({"msg":"Usuario o contraseña incorrecta"}), 404
    


@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    try:
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
        if password != user.password:
            return jsonify({"msg": "Bad email or password"}), 401
        # access_token = create_access_token(identity=email)
        return jsonify({"msg": "Succesfull access"})
    except:
        return jsonify({"msg": "this user does not exist"}), 404
    


































































































#espacio de laura ->