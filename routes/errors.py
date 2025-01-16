from flask import Blueprint, render_template

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(403)
def forbidden(e):
    return render_template('errors/403.html'), 403

