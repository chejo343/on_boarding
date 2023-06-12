from puesto import Puesto
from validator_puestos import validator_puestos_crear, validator_puestos_modificar
from validator_utils import body_delete
from datetime import datetime
from base_controller import BaseController

class PuestosController(BaseController):
  def __init__(self) -> None:
    super().__init__()

  def create(self, body):
    if not validator_puestos_crear.validate(body):
      raise Exception(validator_puestos_crear.errors)
    puesto = Puesto(**body)
    self.session.add(puesto)
    self.session.commit()
    return puesto.to_dict()

  def get_by_id(self, id:int) -> dict:
    puesto = self.session.query(Puesto).get(id)
    return puesto

  def get_list(self) -> list:
    puestos = self.session.query(Puesto)\
      .filter_by(Activo=True).all()
    list_puestos = [p.to_dict() for p in puestos]
    return list_puestos

  def update(self, id: int, body:dict) -> dict:
    if not validator_puestos_modificar.validate(body):
      raise Exception(validator_puestos_modificar.errors)
    puesto = self.session.query(Puesto).get(id)
    if puesto == None:
      return None
    for key, value in body.items():
      setattr(puesto, key, value)
    puesto.FechaModifico = datetime.utcnow()
    self.session.commit()
    return puesto.to_dict()

  def remove(self, id:int, body:dict) -> bool:
    if not body_delete.validate(body):
      raise Exception(body_delete.errors)
    puesto = self.session.query(Puesto).get(id)
    if puesto == None:
      return False
    puesto.Activo = False
    puesto.UsuarioModifico = body['UsuarioModifico']
    puesto.FechaModifico = datetime.utcnow()
    self.session.commit()
    return True