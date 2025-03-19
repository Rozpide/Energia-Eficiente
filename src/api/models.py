from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Tabla: Usuarios
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    name = db.Column(db.String(50), nullable=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relación con la tabla Preferencias
    preferencias = db.relationship('Preferencia', backref='user', lazy=True)

    # Relación con la tabla Recomendaciones
    recomendaciones = db.relationship('Recomendacion', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "date_created": self.date_created
            # Nota: No se debe serializar el password por motivos de seguridad
        }

# Tabla: Proveedores
class Proveedor(db.Model):
    __tablename__ = 'proveedor'

    id = db.Column(db.Integer, primary_key=True)
    nombre_proveedor = db.Column(db.String(100), nullable=False)
    contacto = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(255), nullable=True)

    # Relación con tarifas eléctricas
    tarifas = db.relationship('TarifaElectrica', backref='proveedor', lazy=True)

    def __repr__(self):
        return f'<Proveedor {self.nombre_proveedor}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_proveedor": self.nombre_proveedor,
            "contacto": self.contacto,
            "website": self.website
        }

# Tabla: Tarifas Eléctricas
class TarifaElectrica(db.Model):
    __tablename__ = 'tarifa_electrica'

    id = db.Column(db.Integer, primary_key=True)
    proveedor_id_fk = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)
    registro_hora_fecha_tarifa = db.Column(db.DateTime, nullable=False)
    precio_kw_hora = db.Column(db.Float, nullable=False)
    region = db.Column(db.String(50), nullable=False)
    carbon_impact_kgCO = db.Column(db.Float, nullable=False)
    nombre_tarifa = db.Column(db.String(100), nullable=False)
    rango_horario_bajo = db.Column(db.String(50), nullable=True)

    # Relación con recomendaciones
    recomendaciones = db.relationship('Recomendacion', backref='tarifa_electrica', lazy=True)

    def __repr__(self):
        return f'<TarifaElectrica {self.id} - {self.nombre_tarifa}>'

    def serialize(self):
        return {
            "id": self.id,
            "proveedor_id_fk": self.proveedor_id_fk,
            "registro_hora_fecha_tarifa": self.registro_hora_fecha_tarifa,
            "precio_kw_hora": self.precio_kw_hora,
            "region": self.region,
            "carbon_impact_kgCO": self.carbon_impact_kgCO,
            "nombre_tarifa": self.nombre_tarifa,
            "rango_horario_bajo": self.rango_horario_bajo
        }

# Tabla: Recomendaciones
class Recomendacion(db.Model):
    __tablename__ = 'recomendacion'

    id = db.Column(db.Integer, primary_key=True)
    user_id_fk = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rango_horario = db.Column(db.String(50), nullable=False)
    proveedor_id_fk = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)
    ahorro_estimado = db.Column(db.Float, nullable=False)
    motivo = db.Column(db.String(255), nullable=False)
    recomienda_tarifa_id_fk = db.Column(db.Integer, db.ForeignKey('tarifa_electrica.id'), nullable=True)

    def __repr__(self):
        return f'<Recomendacion {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id_fk": self.user_id_fk,
            "rango_horario": self.rango_horario,
            "proveedor_id_fk": self.proveedor_id_fk,
            "ahorro_estimado": self.ahorro_estimado,
            "motivo": self.motivo,
            "recomienda_tarifa_id_fk": self.recomienda_tarifa_id_fk
        }

# Tabla: Preferencias
class Preferencia(db.Model):
    __tablename__ = 'preferencia'

    id = db.Column(db.Integer, primary_key=True)
    user_id_fk = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    proveedor_preferido_id_fk = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)
    rango_horario_fav = db.Column(db.String(50), nullable=True)  # Por ejemplo, 01:00 - 05:00

    proveedor = db.relationship('Proveedor', backref=db.backref('preferencias', lazy=True))

    def __repr__(self):
        return f'<Preferencia {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id_fk": self.user_id_fk,
            "proveedor_preferido_id_fk": self.proveedor_preferido_id_fk,
            "rango_horario_fav": self.rango_horario_fav
        }
class SolicitudCambio(db.Model):
    __tablename__ = 'solicitud_cambio'

    id = db.Column(db.Integer, primary_key=True)
    user_id_fk = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relación con Usuario
    proveedor_actual_id_fk = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)  # Proveedor actual
    tarifa_actual_id_fk = db.Column(db.Integer, db.ForeignKey('tarifa_electrica.id'), nullable=True)  # Tarifa actual
    proveedor_nuevo_id_fk = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)  # Nuevo proveedor
    tarifa_nueva_id_fk = db.Column(db.Integer, db.ForeignKey('tarifa_electrica.id'), nullable=True)  # Nueva tarifa
    estado = db.Column(db.String(50), default='pendiente', nullable=False)  # Estado de la solicitud (pendiente, aprobada, rechazada)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  # Fecha de creación de la solicitud
    comentario = db.Column(db.String(255), nullable=True)  # Campo opcional para comentarios del usuario

    # Relaciones para facilitar el acceso a las tablas relacionadas
    usuario = db.relationship('User', backref=db.backref('solicitudes', lazy=True))
    proveedor_actual = db.relationship('Proveedor', foreign_keys=[proveedor_actual_id_fk])
    proveedor_nuevo = db.relationship('Proveedor', foreign_keys=[proveedor_nuevo_id_fk])
    tarifa_actual = db.relationship('TarifaElectrica', foreign_keys=[tarifa_actual_id_fk])
    tarifa_nueva = db.relationship('TarifaElectrica', foreign_keys=[tarifa_nueva_id_fk])

    def __repr__(self):
        return f'<SolicitudCambio {self.id} - Estado {self.estado}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id_fk": self.user_id_fk,
            "proveedor_actual_id_fk": self.proveedor_actual_id_fk,
            "tarifa_actual_id_fk": self.tarifa_actual_id_fk,
            "proveedor_nuevo_id_fk": self.proveedor_nuevo_id_fk,
            "tarifa_nueva_id_fk": self.tarifa_nueva_id_fk,
            "estado": self.estado,
            "fecha_creacion": self.fecha_creacion,
            "comentario": self.comentario
        }
