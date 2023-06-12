from responsable import Responsable
from validator_responsables import validator_responsables_crear, validator_responsables_modificar
from validator_utils import body_delete
from datetime import datetime
from base_controller import BaseController

class ResponsablesController(BaseController):
  def __init__(self) -> None:
    super().__init__()

  def create(self, body):
    if not validator_responsables_crear.validate(body):
      raise Exception(validator_responsables_crear.errors)
    responsable = Responsable(**body)
    self.session.add(responsable)
    self.session.commit()
    return responsable.to_dict()

  def get_by_id(self, id:int) -> dict:
    responsable = self.session.query(Responsable).get(id)
    return responsable

  def get_list(self, query) -> list:
    responsables = self.session.query(Responsable)\
      .filter_by(Activo=True)
    responsables = responsables.all()
    list_responsables = [r.to_dict() for r in responsables]
    return list_responsables

  def update(self, id: int, body:dict) -> dict:
    if not validator_responsables_modificar.validate(body):
      raise Exception(validator_responsables_modificar.errors)
    responsable = self.session.query(Responsable).get(id)
    if responsable == None:
      return None
    for key, value in body.items():
      setattr(responsable, key, value)
    responsable.FechaModifico = datetime.utcnow()
    self.session.commit()
    return responsable.to_dict()

  def remove(self, id:int, body:dict) -> bool:
    if not body_delete.validate(body):
      raise Exception(body_delete.errors)
    responsable = self.session.query(Responsable).get(id)
    if responsable == None:
      return False
    responsable.Activo = False
    responsable.UsuarioModifico = body['UsuarioModifico']
    responsable.FechaModifico = datetime.utcnow()
    self.session.commit()
    return True