from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, String, ForeignKey, Column, Integer

db = SQLAlchemy()

class User(db.Model):

    __tablename__ = 'user'

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(75), unique=False, nullable=False)
    email = db.Column(db.String(75), unique=True, nullable=False)
    password = db.Column(db.String(50), unique=False, nullable=False)
    confirm_password = db.Column(db.String(50), unique=False, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    birthday_date = db.Column(db.String(15), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    cart = db.relationship('Cart', backref= 'user')

    def __repr__(self):
        return f'<User {self.email, self.username}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "password": self.password,
            "confirm_password": self.confirm_password,
            "username": self.username,
            "birthday_date": self.birthday_date,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
            # do not serialize the password, its a security breach
        }

class Cart(db.Model):

    __tablename__ = 'cart'

    cart_id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(150), unique=False, nullable=False)
    price = db.Column(db.String(25), unique=False, nullable=False)
    smartphones = db.relationship('Smartphones', backref= 'cart')
    smartphones_id = db.Column(db.Integer, db.ForeignKey('smartphones.smartphone_id'))
    tvs = db.relationship('TVs', backref= 'cart')
    laptops = db.relationship('Laptops', backref= 'cart')
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __repr__(self):
        return f'<Cart {self.model, self.price}>'

    def serialize(self):
        return {
            "cart_id": self.id,
            "model": self.model,
            "price": self.price,
            # do not serialize the password, its a security breach
        }

class Smartphones(db.Model):

    __tablename__ = 'smartphones'

    smartphone_id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(150), unique=False, nullable=False)
    pantalla = db.Column(db.String(150), unique=False, nullable=False)
    procesador = db.Column(db.String(150), unique=False, nullable=False)
    memoria_ram = db.Column(db.String(150), unique=False, nullable=False)
    almacenamiento = db.Column(db.String(150), unique=False, nullable=False)
    camara = db.Column(db.String(150), unique=False, nullable=False)
    bateria = db.Column(db.String(150), unique=False, nullable=False)
    precio = db.Column(db.String(50), unique=False, nullable=False)
    conectividad = db.Column(db.String(150), unique=False, nullable=False)
    colores = db.Column(db.JSON, unique=False, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    imagen = db.Column(db.JSON, unique=False,)
    

    def __repr__(self):
        return f'<Smartphones {self.modelo, self.precio}>'

    def serialize(self):
        return {
            "smartphone_id": self.smartphone_id,
            "modelo": self.modelo,
            "pantalla" : self.pantalla,
            "procesador" : self.procesador,
            "memoria_ram" : self.memoria_ram,
            "almacenamiento" : self.almacenamiento,
            "camara" : self.camara,
            "bateria" : self.bateria,
            "precio" : self.precio,
            "conectividad" : self.conectividad,
            "colores" : self.colores,
            "descripcion" : self.descripcion,
            "imagen" : self.imagen,
        }

class TVs(db.Model):

    __tablename__ = 'tv'

    tv_id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(150), unique=False, nullable=False)
    contenido_de_la_caja = db.Column(db.String(150), unique=False, nullable=False)
    modelo = db.Column(db.String(150), unique=False, nullable=False)
    usos_recomendados = db.Column(db.String(150), unique=False, nullable=False)
    año_modelo = db.Column(db.String(50), unique=False, nullable=False)
    fabricante = db.Column(db.String(150), unique=False, nullable=False)
    precio = db.Column(db.String(50), unique=False, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    pantalla = db.Column(db.String(150), unique=False, nullable=False)
    conectividad = db.Column(db.String(150), unique=False, nullable=False)
    medidas = db.Column(db.String(50), unique=False, nullable=False)
    imagen = db.Column(db.JSON, unique=False, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.cart_id'))

    def __repr__(self):
        return f'<TVs {self.modelo, self.marca, self.precio}>'

    def serialize(self):
        return {
            "tv_id": self.tv_id,
            "marca": self.marca,
            "contenido_de_la_caja" : self.contenido_de_la_caja,
            "modelo" : self.modelo,
            "usos_recomendados" : self.usos_recomendados,
            "año_modelo" : self.año_modelo,
            "fabricante" : self.fabricante,
            "precio" : self.precio,
            "descripcion" : self.descripcion,
            "pantalla" : self.pantalla,
            "conectividad" : self.conectividad,
            "medidas" : self.medidas,
            "imagen" : self.imagen,
        }

class Laptops(db.Model):

    __tablename__ = 'laptops'

    laptop_id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(150), unique=False, nullable=False)
    modelo = db.Column(db.String(150), unique=False, nullable=False)
    pantalla = db.Column(db.String(150), unique=False, nullable=False)
    procesador = db.Column(db.String(150), unique=False, nullable=False)
    modelo_cpu = db.Column(db.String(150), unique=False, nullable=False)
    sistema_operativo = db.Column(db.String(150), unique=False, nullable=False)
    memoria_ram = db.Column(db.String(150), unique=False, nullable=False)
    almacenamiento = db.Column(db.String(300), unique=False, nullable=False)
    camara = db.Column(db.String(150), unique=False, nullable=False)
    bateria = db.Column(db.String(150), unique=False, nullable=False)
    precio = db.Column(db.String(50), unique=False, nullable=False)
    tecnologia = db.Column(db.String(150), unique=False, nullable=False)
    colores = db.Column(db.JSON, unique=False, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    imagen = db.Column(db.JSON, unique=False, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.cart_id'))

    def __repr__(self):
        return f'<Laptops {self.modelo, self.marca, self.precio}>'

    def serialize(self):
        return {
            "laptop_id": self.laptop_id,
            "marca": self.marca,
            "modelo" : self.modelo,
            "pantalla" : self.pantalla,
            "procesador" : self.procesador,
            "modelo_cpu" : self.modelo_cpu,
            "sistema_operativo" : self.sistema_operativo,
            "memoria_ram" : self.memoria_ram,
            "almacenamiento" : self.almacenamiento,
            "camara" : self.camara,
            "bateria" : self.bateria,
            "precio" : self.precio,
            "tecnologia" : self.tecnologia,
            "colores" : self.colores,
            "descripcion" : self.descripcion,
            "imagen" : self.imagen,
        }