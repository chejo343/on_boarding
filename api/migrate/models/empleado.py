from db import db
import datetime
from model_base import ModelBase

class Empleado(db.Model, ModelBase):
  __tablename__ = 'OBTEmpleado'

  IdEmpleado = db.Column('IdEmpleado', db.Integer, primary_key=True)
  Nombre = db.Column('Nombre', db.String(512), nullable=False)
  Apellido = db.Column('Apellido', db.String(512), nullable=False)
  Telefono = db.Column('Telefono', db.String(20), nullable=True)
  DPI = db.Column('DPI', db.String(13), nullable=False)
  Email = db.Column('Email', db.String(512), nullable=True)
  Activo = db.Column('Activo', db.Boolean, default=True)
  IdPuesto = db.Column('IdPuesto', db.Integer, nullable=True)
  Asignado = db.Column('Asignado', db.Boolean, default=False)

  UsuarioCreo = db.Column('UsuarioCreo', db.String(255), nullable=True)
  UsuarioModifico = db.Column('UsuarioModifico', db.String(255), nullable=True)
  FechaCreo = db.Column('FechaCreo', db.DateTime, nullable=True, default=datetime.datetime.utcnow)
  FechaModifico = db.Column('FechaModifico', db.DateTime, nullable=True)

  def __repr__(self) -> str:
    return f'Id: {self.IdEmpleado}'