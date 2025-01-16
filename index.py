from app import app
from utils.db import db
from models.usuarios import Usuario
from models.autos import Auto
from models.personal import Personal


with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)