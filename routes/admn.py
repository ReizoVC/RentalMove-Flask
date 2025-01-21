from flask import Blueprint, request, render_template, redirect, url_for, flash, current_app
from utils.db import db
from utils.decorators import admin_required
from models.autos import Auto
from models.personal import Personal
from models.usuarios import Usuario
import os
from werkzeug.utils import secure_filename
from utils.modules import get_vehicle_count, get_user_count, get_personal_count

admn = Blueprint('admn', __name__)

# Principales

@admn.route('/admin')
@admin_required
def admin():
    vehicle_count = get_vehicle_count()
    user_count = get_user_count()
    personal_count = get_personal_count()
    return render_template('adminPages/ad_home.html', vehicle_count=vehicle_count, user_count=user_count, personal_count=personal_count)


@admn.route('/admin/vehiculos')
@admin_required
def admin_autos():
    autos = Auto.query.all()
    return render_template('adminPages/ad_autos.html', autos=autos)


@admn.route('/admin/usuarios')
@admin_required
def admin_usuarios():
    usuarios = Usuario.query.all()
    return render_template('adminPages/ad_usuarios.html', usuarios=usuarios)


@admn.route('/admin/personal')
@admin_required
def admin_personal():
    personal_list = Personal.query.all()
    return render_template('adminPages/ad_personal.html', personal_list=personal_list)




# Agregando



@admn.route('/admin/vehiculos/nuevo', methods=['GET', 'POST'])
@admin_required
def nuevo_auto():
    if request.method == 'POST':
        if 'imagen' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['imagen']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            imagen = os.path.join('static/uploads', filename)
            modelo = request.form['modelo']
            marca = request.form['marca']
            transmision = request.form['transmision']
            traccion = request.form['traccion']
            potencia = request.form['potencia']
            stock = request.form['stock']
            categoria = request.form['categoria']
            disponibilidad = request.form['disponibilidad'].lower() == 'true'
            precio_dia = request.form['precio_dia']
            nuevo_auto = Auto(imagen=imagen, modelo=modelo, marca=marca, transmision=transmision, traccion=traccion, potencia=potencia, stock=stock, categoria=categoria, disponibilidad=disponibilidad, precio_dia=precio_dia)
            db.session.add(nuevo_auto)
            db.session.commit()
            flash('Auto creado exitosamente')
    return redirect('/admin/vehiculos')



@admn.route('/admin/personal/nuevo', methods=['POST'])
@admin_required
def nuevo_personal():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        nroDni = request.form['nroDni']
        rol = 'admin'
        nuevo_personal = Personal(nombre=nombre, apellido=apellido, correo=correo, contrasena=contrasena, nroDni=nroDni, rol=rol)
        db.session.add(nuevo_personal)
        db.session.commit()
        flash('Personal creado exitosamente')
        return redirect(url_for('admn.admin_personal'))
    return render_template('adminPages/ad_personal.html')

@admn.route('/admin/usuarios/nuevo', methods=['POST'])
@admin_required
def nuevo_usuario():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        nroLicencia = request.form['nroLicencia']
        nroDni = request.form['nroDni']
        rol = request.form['rol']
        nuevo_usuario = Usuario(nombre=nombre, apellido=apellido, correo=correo, contrasena=contrasena, nroLicencia=nroLicencia, nroDni=nroDni, rol=rol)
        db.session.add(nuevo_usuario)
        db.session.commit()
        flash('Usuario creado exitosamente')
        return redirect(url_for('admn.admin_usuarios'))
    return render_template('adminPages/ad_usuarios.html')



# Actualizando


@admn.route('/admin/usuarios/actualizar', methods=['POST'])
@admin_required
def actualizar_usuario():
    usuario_id = request.form['id']
    usuario = Usuario.query.get_or_404(usuario_id)
    usuario.nombre = request.form['nombre']
    usuario.apellido = request.form['apellido']
    usuario.correo = request.form['correo']
    usuario.contrasena = request.form['contrasena']
    usuario.nroLicencia = request.form['nroLicencia']
    usuario.nroDni = request.form['nroDni']
    nuevo_rol = request.form['rol']

    
    if usuario.rol == 'usuario' and nuevo_rol == 'admin':
        # Agregar a la tabla personal si el rol cambia de usuario a admin
        nuevo_personal = Personal(
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            correo=usuario.correo,
            contrasena=usuario.contrasena,
            nroDni=usuario.nroDni,
            rol='admin'
        )
        db.session.add(nuevo_personal)
        db.session.commit()
        # Eliminar de la tabla usuarios
        db.session.delete(usuario)
        db.session.commit()
    else:
        usuario.rol = nuevo_rol
        db.session.commit()
    
    flash('Usuario actualizado exitosamente')    
    return redirect(url_for('admn.admin_usuarios'))

@admn.route('/admin/personal/actualizar', methods=['POST'])
@admin_required
def actualizar_personal():
    personal_id = request.form['id']
    personal = Personal.query.get_or_404(personal_id)
    personal.nombre = request.form['nombre']
    personal.apellido = request.form['apellido']
    personal.correo = request.form['correo']
    personal.contrasena = request.form['contrasena']
    personal.nroDni = request.form['nroDni']
    nuevo_rol = request.form['rol']

    if personal.rol == 'admin' and nuevo_rol == 'usuario':
        # Eliminar de la tabla personal si el rol cambia de admin a usuario
        db.session.delete(personal)
        db.session.commit()
        
        # Agregar a la tabla usuarios
        nuevo_usuario = Usuario(
            nombre=personal.nombre,
            apellido=personal.apellido,
            correo=personal.correo,
            contrasena=personal.contrasena,
            nroLicencia='',  # Asigna un valor adecuado si es necesario
            nroDni=personal.nroDni,
            rol='usuario'
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
    else:
        personal.rol = nuevo_rol
        db.session.commit()
    
    flash('Personal actualizado exitosamente')
    return redirect(url_for('admn.admin_personal'))

@admn.route('/admin/vehiculos/actualizar', methods=['POST'])
@admin_required
def actualizar_auto():
    auto_id = request.form['id']
    auto = Auto.query.get_or_404(auto_id)

    if 'imagen' in request.files:
        imagen = request.files['imagen']
        if imagen.filename != '':
            filename = secure_filename(imagen.filename)
            imagen.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            auto.imagen = filename

    auto.modelo = request.form['modelo']
    auto.marca = request.form['marca']
    auto.transmision = request.form['transmision']
    auto.traccion = request.form['traccion']
    auto.potencia = request.form['potencia']
    auto.stock = request.form['stock']
    auto.categoria = request.form['categoria']
    auto.precio_dia = float(request.form['precio_dia'])
    auto.disponibilidad = request.form['disponibilidad'].lower() == 'true'

    db.session.commit()
    
    flash('Auto actualizado exitosamente')
    return redirect('/admin/vehiculos')



#Eliminando



@admn.route('/admin/usuarios/eliminar/<int:usuario_id>', methods=['POST'])
@admin_required
def eliminar_usuario(usuario_id):
    usuario = Usuario.query.get_or_404(usuario_id)
    db.session.delete(usuario)
    db.session.commit()
    flash('Usuario eliminado exitosamente')
    return redirect(url_for('admn.admin_usuarios'))


@admn.route('/admin/personal/eliminar/<int:personal_id>', methods=['POST'])
@admin_required
def eliminar_personal(personal_id):
    personal = Personal.query.get_or_404(personal_id)
    db.session.delete(personal)
    db.session.commit()
    flash('Personal eliminado exitosamente')
    return redirect(url_for('admn.admin_personal'))

@admn.route('/admin/vehiculos/eliminar/<int:auto_id>', methods=['POST'])
@admin_required
def eliminar_auto(auto_id):
    auto = Auto.query.get_or_404(auto_id)
    db.session.delete(auto)
    db.session.commit()
    flash('Auto eliminado exitosamente')
    return redirect(url_for('admn.admin_autos'))