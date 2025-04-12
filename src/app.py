"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
""""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # Importar JWT Manager
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.routes_proveedores import proveedores_bp  # Importa el Blueprint
from api.routes_users import users_bp
from api.routes_tarifa_electrica import tarifa_electrica_bp  # Importar el blueprint de tarifas eléctricas
from api.admin import setup_admin
from api.commands import setup_commands

# Configuración del entorno (desarrollo o producción)
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de CORS (Permitir solicitudes de cualquier origen durante desarrollo)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")  # Manejo para URLs de PostgreSQL
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de JWT (Flask-JWT-Extended)
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Cambia esto por una clave segura
app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # Especifica que el token estará en los headers
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 36000  # El token expira en 1 hora
jwt = JWTManager(app)

# Inicialización de componentes
setup_admin(app)
setup_commands(app)

# Registro de Blueprints
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(proveedores_bp, url_prefix='/api')
app.register_blueprint(tarifa_electrica_bp, url_prefix='/api')

# Manejo de errores personalizados
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar el sitemap con todos los endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Manejar/servir cualquier archivo como estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché del navegador
    return response

# Ejecutar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

    """
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.routes_proveedores import proveedores_bp
from api.routes_users import users_bp
from api.routes_tarifa_electrica import tarifa_electrica_bp
from api.admin import setup_admin
from api.commands import setup_commands


# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

app.url_map.strict_slashes = False


# Configuración de CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración de JWT
app.config["JWT_SECRET_KEY"] = "your_secret_key"
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
jwt = JWTManager(app)

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Inicializar administración
setup_admin(app)

# Inicializar comandos personalizados
setup_commands(app)

# Registrar Blueprints
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(proveedores_bp, url_prefix='/api')
app.register_blueprint(tarifa_electrica_bp, url_prefix='/api')

# Manejo de errores personalizados
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

    