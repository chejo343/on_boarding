from db import db
import datetime
from model_base import ModelBase

class Requerimiento(db.Model, ModelBase):
  __tablename__ = 'OBTRequerimiento'

  IdRequerimiento = db.Column('IdRequerimiento', db.Integer, primary_key=True)
  Descripcion = db.Column('Descripcion', db.String(512), nullable=False)
  Activo = db.Column('Activo', db.Boolean, default=True)
  Estandar = db.Column('Estandar', db.Boolean, default=False)
  IdPuesto = db.Column('IdPuesto', db.Integer)
  IdResponsable = db.Column('IdResponsable', db.Integer)

  UsuarioCreo = db.Column('UsuarioCreo', db.String(255), nullable=True)
  UsuarioModifico = db.Column('UsuarioModifico', db.String(255), nullable=True)
  FechaCreo = db.Column('FechaCreo', db.DateTime, nullable=True, default=datetime.datetime.utcnow)
  FechaModifico = db.Column('FechaModifico', db.DateTime, nullable=True)

  def __repr__(self) -> str:
    return f'Id: {self.IdRequerimiento}'