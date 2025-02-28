from utils.db import db
from flask_login import UserMixin
from datetime import datetime
from pytz import timezone

class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    auto_id = db.Column(db.Integer, db.ForeignKey('autos.id'), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    precio_total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pendiente')
    fecha_prestamo = db.Column(db.Date, nullable=False)  # Nuevo campo

    def __init__(self, usuario_id, auto_id, fecha_inicio, fecha_fin, precio_total, status='pendiente', fecha_prestamo=None):
        self.usuario_id = usuario_id
        self.auto_id = auto_id
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.precio_total = precio_total
        self.status = status
        if fecha_prestamo is None:
            lima_tz = timezone('America/Lima')
            fecha_prestamo = datetime.now(lima_tz).date()
        self.fecha_prestamo = fecha_prestamo

