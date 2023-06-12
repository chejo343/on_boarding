from empleado import Empleado
from validator_empleados import validator_empleado_crear, validator_empleado_modificar
from validator_utils import body_delete
from datetime import datetime
from base_controller import BaseController
import pandas as pd

class EmpleadosController(BaseController):
  def __init__(self) -> None:
    super().__init__()

  def create(self, body):
    if not validator_empleado_crear.validate(body):
      raise Exception(validator_empleado_crear.errors)
    empleado = Empleado(**body, Asignado=False)
    self.session.add(empleado)
    self.session.commit()
    return empleado.to_dict()

  def get_by_id(self, id:int) -> dict:
    empleado = self.session.query(Empleado).get(id)
    return empleado

  def get_list(self) -> list:
    query = '''
      SELECT
        em.IdEmpleado,
        em.Nombre,
        em.Apellido,
        em.DPI,
        em.Telefono,
        em.Email,
        em.Activo,
        em.Asignado,
        em.UsuarioCreo,
        em.UsuarioModifico,
        pu.Nombre AS Puesto,
        pu.IdPuesto
      FROM OBTEmpleado AS em
      INNER JOIN OBTPuesto AS pu ON em.IdPuesto = pu.IdPuesto
      WHERE em.Activo = 1
    '''
    df = pd.read_sql_query(query, self.engine)
    df['Asignado'] = df['Asignado'].fillna(0)
    return df.to_dict(orient='records')

  def update(self, id: int, body:dict) -> dict:
    if not validator_empleado_modificar.validate(body):
      raise Exception(validator_empleado_modificar.errors)
    empleado = self.session.query(Empleado).get(id)
    if empleado == None:
      return None
    for key, value in body.items():
      setattr(empleado, key, value)
    empleado.FechaModifico = datetime.utcnow()
    self.session.commit()
    return empleado.to_dict()

  def remove(self, id:int, body:dict) -> bool:
    if not body_delete.validate(body):
      raise Exception(body_delete.errors)
    empleado = self.session.query(Empleado).get(id)
    if empleado == None:
      return False
    empleado.Activo = False
    empleado.UsuarioModifico = body['UsuarioModifico']
    empleado.FechaModifico = datetime.utcnow()
    self.session.commit()
    return True
