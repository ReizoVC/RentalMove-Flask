from flask import Blueprint, request, render_template, redirect, jsonify, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from models.usuarios import Usuario
from models.personal import Personal
from models.autos import Auto
from models.prestamos import Prestamo
from utils.db import db
from datetime import datetime

inicio = Blueprint('inicio', __name__)

@inicio.route('/')
def home():
    return render_template('pages/index.html')

@inicio.route('/catalogo')
def catalogoautos():
    categoria = request.args.get('categoria')
    transmision = request.args.get('transmision')
    
    if categoria:
        autos = Auto.query.filter_by(categoria=categoria).all()
    elif transmision:
        autos = Auto.query.filter_by(transmision=transmision).all()
    else:
        autos = Auto.query.all()
    
    return render_template('pages/catalogo.html', autos=autos)





@inicio.route('/newuser', methods=['POST'])
def newuser():
    nombre = (request.form['first-name'])
    apellido = (request.form['last-name'])
    correo = (request.form['email'])
    nroLicencia = (request.form['license-number'])
    nroDni = (request.form['dni-number'])

    if request.form['password'] != request.form['confirm-password']:
        return jsonify({'status': 'error', 'message': 'Las contraseñas no coinciden'}), 400
    else:
        contrasena = (request.form['password'])

    usuario = Usuario(nombre=nombre, apellido=apellido, correo=correo, contrasena=contrasena, nroLicencia=nroLicencia, nroDni=nroDni)

    db.session.add(usuario)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Usuario creado exitosamente'}), 200

@inicio.route('/login', methods=['POST'])
def login():
    correo = request.form['email']
    contrasena = request.form['password']

    usuario = Usuario.query.filter_by(correo=correo).first()
    personal = Personal.query.filter_by(correo=correo).first()

    if usuario and usuario.contrasena == contrasena:
        login_user(usuario)
        return jsonify({'status': 'success', 'message': 'Usuario logueado exitosamente', 'nombre': usuario.nombre, 'rol': usuario.rol}), 200
    elif personal and personal.contrasena == contrasena:
        login_user(personal)
        return jsonify({'status': 'success', 'message': 'Personal logueado exitosamente', 'nombre': personal.nombre, 'rol': personal.rol}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Correo o contraseña incorrectos'}), 400

@inicio.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')

@inicio.route('/alquilar/<int:auto_id>', methods=['GET', 'POST'])
@login_required
def alquilar_auto(auto_id):
    auto = Auto.query.get_or_404(auto_id)
    if request.method == 'POST':
        fecha_inicio = request.form['fecha_inicio']
        fecha_fin = request.form['fecha_fin']
        dias = (datetime.strptime(fecha_fin, '%Y-%m-%d') - datetime.strptime(fecha_inicio, '%Y-%m-%d')).days
        precio_total = dias * auto.precio_dia
        status = 'pendiente'  # Default status
        fecha_prestamo = datetime.now().date()  # Fecha del día en que se realizó el préstamo

        # Guardar la transacción en la base de datos
        transaccion = Prestamo(
            usuario_id=current_user.id,
            auto_id=auto.id,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            precio_total=precio_total,
            status=status,
            fecha_prestamo=fecha_prestamo
        )
        db.session.add(transaccion)

        # Reducir el stock del auto
        auto.stock -= 1
        if auto.stock == 0:
            auto.disponibilidad = False

        db.session.commit()

        flash('Transacción completada exitosamente')
        return redirect(url_for('inicio.catalogoautos'))

    return render_template('inners/alquilar_auto.html', auto=auto)