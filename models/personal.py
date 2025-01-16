from utils.db import db
from flask_login import UserMixin

class Personal(db.Model, UserMixin):
    __tablename__ = 'personal'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    correo = db.Column(db.String(50), nullable=False, unique=True)
    contrasena = db.Column(db.String(50), nullable=False)
    nroDni = db.Column(db.String(50), nullable=False)
    rol = db.Column(db.String(20), nullable=False, default='admin')

    def __init__(self, nombre, apellido, correo, contrasena, nroDni, rol='admin'):
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo
        self.contrasena = contrasena
        self.nroDni = nroDni
        self.rol = rol

    def __repr__(self):
        return f'<Personal {self.nombre} {self.apellido}>'