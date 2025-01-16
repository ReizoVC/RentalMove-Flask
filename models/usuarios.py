from utils.db import db
from flask_login import UserMixin
from sqlalchemy import event
from models.personal import Personal

class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(50), nullable=False)
    nroLicencia = db.Column(db.String(50), nullable=False)
    nroDni = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='usuario')

    def __init__(self, nombre, apellido, correo, contrasena, nroLicencia, nroDni, rol='usuario'):
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo
        self.contrasena = contrasena
        self.nroLicencia = nroLicencia
        self.nroDni = nroDni
        self.rol = rol 

    def __repr__(self):
        return f'<Usuario {self.nombre}>'