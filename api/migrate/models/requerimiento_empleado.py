from db import db
import datetime
from model_base import ModelBase

class RequerimientoEmpleado(db.Model, ModelBase):
  __tablename__ = 'OBTRequerimientoEmpleado'

  IdRequerimientoEmpleado = db.Column('IdRequerimientoEmpleado', db.Integer, primary_key=True)
  Activo = db.Column('Activo', db.Boolean, default=True)
  Completado = db.Column('Completado', db.Boolean, default=False)
  FechaCompletado = db.Column('FechaCompletado', db.DateTime, nullable=True)
  IdEmpleado = db.Column('IdEmpleado', db.Integer, nullable=True)
  IdRequerimiento = db.Column('IdRequerimiento', db.Integer, nullable=True)

  UsuarioCreo = db.Column('UsuarioCreo', db.String(255), nullable=True)
  UsuarioModifico = db.Column('UsuarioModifico', db.String(255), nullable=True)
  FechaCreo = db.Column('FechaCreo', db.DateTime, nullable=True, default=datetime.datetime.utcnow)
  FechaModifico = db.Column('FechaModifico', db.DateTime, nullable=True)

  def __repr__(self) -> str:
    return f'Id: {self.IdRequerimientoEmpleado}'