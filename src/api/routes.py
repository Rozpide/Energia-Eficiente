"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Genre
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
import requests
# Import the Cloudinary libraries
# ==============================
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

cloudinary.config(
    cloud_name= os.getenv('CLOUD_NAME'),
    api_key= os.getenv('CLOUDINARY_API_KEY'),
    api_secret= os.getenv('CLOUDINARY_API_SECRET'),
    secure= True
)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/img', methods=["POST"])
def upload_image():
    img = request.files["img"]
    img_url = cloudinary.uploader.upload(img)
    print(img_url)
    return jsonify({"img": img_url["url"]}),200


# ROUTE TO LOAD GENRES
@api.route('/getGenresapi', methods=["GET"])
def getGenresApi():
    url = "https://api.deezer.com/genre"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers = headers)
    data = response.json()
    for genre in data.get("data", []):
        if not Genre.query.filter_by(id = genre.get("id")).first():
            new_genre = Genre(id = genre.get("id"), name = genre.get("name"))
            db.session.add(new_genre)
        db.session.commit()
    return jsonify(data)

@api.route('/getGenres', methods=["GET"])
def getGenres():
    genres = Genre.query.filter(Genre.id != 0).all()
    return jsonify({"genres": [genre.serialize() for genre in genres]}), 200