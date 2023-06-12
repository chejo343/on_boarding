from flask import Flask
from flask_migrate import Migrate
from db import db
from models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f''# agregar cadena de conexion

db.init_app(app)
migrate = Migrate(app, db, command='db')
