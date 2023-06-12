from db import db
import datetime
from model_base import ModelBase

class Puesto(db.Model, ModelBase):
  __tablename__ = 'OBTPuesto'

  IdPuesto = db.Column('IdPuesto', db.Integer, primary_key=True)
  Nombre = db.Column('Nombre', db.String(512), nullable=False)
  Descripcion = db.Column('Descripcion', db.String(4294000000), nullable=True)
  Activo = db.Column('Activo', db.Boolean, default=True)

  UsuarioCreo = db.Column('UsuarioCreo', db.String(255), nullable=True)
  UsuarioModifico = db.Column('UsuarioModifico', db.String(255), nullable=True)
  FechaCreo = db.Column('FechaCreo', db.DateTime, nullable=True, default=datetime.datetime.utcnow)
  FechaModifico = db.Column('FechaModifico', db.DateTime, nullable=True)

  def __repr__(self) -> str:
    return f'Id: {self.IdPuesto}'