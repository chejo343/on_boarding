from requerimiento import Requerimiento
from validator_requerimientos import validator_requerimientos_crear, validator_requerimientos_modificar
from validator_utils import body_delete
from datetime import datetime
from base_controller import BaseController

class RequerimientosController(BaseController):
  def __init__(self) -> None:
    super().__init__()

  def create(self, body):
    if not validator_requerimientos_crear.validate(body):
      raise Exception(validator_requerimientos_crear.errors)
    requerimiento = Requerimiento(**body)
    self.session.add(requerimiento)
    self.session.commit()
    return requerimiento.to_dict()

  def get_by_id(self, id:int) -> dict:
    requerimiento = self.session.query(Requerimiento).get(id)
    return requerimiento

  def get_list(self, query) -> list:
    requerimientos = self.session.query(Requerimiento)\
      .filter_by(Activo=True)
    if 'IdPuesto' in query:
      requerimientos = requerimientos.filter_by(IdPuesto=query['IdPuesto'])
    requerimientos = requerimientos.all()
    list_requerimientos = [r.to_dict() for r in requerimientos]
    return list_requerimientos

  def update(self, id: int, body:dict) -> dict:
    if not validator_requerimientos_modificar.validate(body):
      raise Exception(validator_requerimientos_modificar.errors)
    requerimiento = self.session.query(Requerimiento).get(id)
    if requerimiento == None:
      return None
    for key, value in body.items():
      setattr(requerimiento, key, value)
    requerimiento.FechaModifico = datetime.utcnow()
    self.session.commit()
    return requerimiento.to_dict()

  def remove(self, id:int, body:dict) -> bool:
    if not body_delete.validate(body):
      raise Exception(body_delete.errors)
    requerimiento = self.session.query(Requerimiento).get(id)
    if requerimiento == None:
      return False
    requerimiento.Activo = False
    requerimiento.UsuarioModifico = body['UsuarioModifico']
    requerimiento.FechaModifico = datetime.utcnow()
    self.session.commit()
    return True