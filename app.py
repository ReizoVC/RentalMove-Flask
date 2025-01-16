from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.inicio import inicio
from routes.admn import admn
from routes.errors import errors
from utils.db import db
from flask_login import LoginManager
from models.usuarios import Usuario
from models.autos import Auto
from models.personal import Personal
from dotenv import load_dotenv
from os import environ

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:va1Mq6v9mZyH8PH7@db.kcayihbvxqjieigbnwwh.supabase.co:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')

app.config['UPLOAD_FOLDER'] = 'static/uploads'

db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'inicio.login'


@login_manager.user_loader
def load_user(user_id):
    user = Usuario.query.get(int(user_id))
    if not user:
        user = Personal.query.get(int(user_id))
    return user


app.register_blueprint(inicio)
app.register_blueprint(admn)
app.register_blueprint(errors)
