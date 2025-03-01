"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Accounts
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required,verify_jwt_in_request
from flask_jwt_extended.exceptions import NoAuthorizationError


api = Blueprint('api', __name__)
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
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    except:
        return jsonify({"msg": "this user does not exist"}), 404
    
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    
@api.route('/<int:user_id>/new-account', methods=['POST'])
def post_account(user_id):
    try:
        request_body = request.json

        exist = db.session.query(db.select(Accounts).filter_by(name=request_body["name"]).exists()).scalar()
        print(exist)
        if not exist: 
            print(exist)
            print(request_body)
            new_account = Accounts(user_id=user_id, name=request_body["name"], balance=request_body["balance"], coin=request_body["coin"], type=request_body["type"])
            db.session.add(new_account)
            db.session.commit()  
            return jsonify(request_body), 200

        else:
            return jsonify({"msg": "Account already exist"}), 404
    except Exception as e:
        return jsonify({"msg":"Error", "error": str(e)}), 500
        

@api.route('/accounts', methods=['GET'])
def get_accounts():

    data = db.session.scalars(db.select(Accounts)).all()
    result = list(map(lambda item: item.serialize(),data))
    
    if result == []:
        return jsonify({"msg":"no accounts, please create one"}), 404

    response_body = {
        "results": result
    }

    return jsonify(response_body), 200

@api.route("/verify-token", methods=["GET"])
def verify_token():
    try:
        verify_jwt_in_request()  # Verifica la validez del token
        identity = get_jwt_identity()  # Obtiene el usuario del token
        return jsonify({"valid": True, "user": identity}), 200
    except NoAuthorizationError:
        return jsonify({"valid": False, "message": "Token inválido o no proporcionado"}), 401