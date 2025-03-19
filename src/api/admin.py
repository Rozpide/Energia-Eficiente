import os
from flask_admin import Admin
from .models import db, User, Proveedor, TarifaElectrica, Recomendacion, Preferencia, SolicitudCambio
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Gestor de Energía Admin', template_mode='bootstrap3')

    # Añadir modelos al panel de administración
    admin.add_view(ModelView(User, db.session))                 # Usuarios
    admin.add_view(ModelView(Proveedor, db.session))            # Proveedores
    admin.add_view(ModelView(TarifaElectrica, db.session))      # Tarifas Eléctricas
    admin.add_view(ModelView(Recomendacion, db.session))        # Recomendaciones
    admin.add_view(ModelView(Preferencia, db.session))          # Preferencias
    admin.add_view(ModelView(SolicitudCambio, db.session))      # Solicitudes de Cambio
