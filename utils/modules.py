from models.autos import Auto
from models.usuarios import Usuario
from models.personal import Personal

def get_vehicle_count():
    return Auto.query.count()

def get_user_count():
    return Usuario.query.count()

def get_personal_count():
    return Personal.query.count()