from utils.db import db
from flask_login import UserMixin

class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    auto_id = db.Column(db.Integer, db.ForeignKey('autos.id'), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    precio_total = db.Column(db.Float, nullable=False)

    def __init__(self, usuario_id, auto_id, fecha_inicio, fecha_fin, precio_total):
        self.usuario_id = usuario_id
        self.auto_id = auto_id
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.precio_total = precio_total

