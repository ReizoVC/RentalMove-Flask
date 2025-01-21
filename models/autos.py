from utils.db import db

class Auto(db.Model):
    __tablename__ = 'autos'

    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(255), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    transmision = db.Column(db.String(50), nullable=False)
    traccion = db.Column(db.String(50), nullable=False)
    potencia = db.Column(db.Integer, nullable=False)
    precio_dia = db.Column(db.Float)
    stock = db.Column(db.Integer, nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    disponibilidad = db.Column(db.Boolean, nullable=False, default=True)

    def __init__(self, imagen, modelo, marca, transmision, traccion, potencia, stock, categoria, precio_dia, disponibilidad=True):
        self.imagen = imagen
        self.modelo = modelo
        self.marca = marca
        self.transmision = transmision
        self.traccion = traccion
        self.potencia = potencia
        self.stock = stock
        self.categoria = categoria
        self.precio_dia = precio_dia
        self.disponibilidad = disponibilidad

    def __repr__(self):
        return f'<Auto {self.modelo}>'