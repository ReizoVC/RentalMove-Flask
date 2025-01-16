from utils.db import db

class Auto(db.Model):
    __tablename__ = 'autos'

    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(255), nullable=False)
    placa = db.Column(db.String(50), nullable=False, unique=True)
    modelo = db.Column(db.String(50), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    año = db.Column(db.Integer, nullable=False)
    precio_dia = db.Column(db.Float)
    disponibilidad = db.Column(db.Boolean, nullable=False, default=True)

    def __init__(self, imagen, placa, modelo, marca, año, precio_dia, disponibilidad=True):
        self.imagen = imagen
        self.placa = placa
        self.modelo = modelo
        self.marca = marca
        self.año = año
        self.precio_dia = precio_dia
        self.disponibilidad = disponibilidad

    def __repr__(self):
        return f'<Auto {self.placa}>'