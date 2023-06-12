from requerimiento_empleado import RequerimientoEmpleado
from validator_requerimientos_empleados import validator_requerimientos_empleados_crear, validator_requerimientos_empleados_modificar
from validator_utils import body_delete
from datetime import datetime
from base_controller import BaseController
import pandas as pd

class RequerimientosEmpleadosController(BaseController):
  def __init__(self) -> None:
    super().__init__()

  def create(self, body):
    if not validator_requerimientos_empleados_crear.validate(body):
      raise Exception(validator_requerimientos_empleados_crear.errors)
    req_empleado = RequerimientoEmpleado(**body)
    self.session.add(req_empleado)
    self.session.commit()
    return req_empleado.to_dict()

  def get_by_id(self, id:int) -> dict:
    req_empleado = self.session.query(RequerimientoEmpleado).get(id)
    return req_empleado

  def get_list(self, query) -> list:
    conditions = ''
    if 'IdEmpleado' in query:
      conditions += f' AND re.IdEmpleado={query["IdEmpleado"]}'
    sql = f'''
      SELECT
        re.IdRequerimientoEmpleado,
        re.Completado,
        re.FechaCompletado,
        re.FechaModifico,
        re.FechaCreo,
        re.IdEmpleado,
        re.IdRequerimiento,
        rq.Descripcion,
        rs.Nombre
      FROM OBTRequerimientoEmpleado AS re
      INNER JOIN OBTRequerimiento AS rq ON re.IdRequerimiento = rq.IdRequerimiento
      INNER JOIN OBTResponsable AS rs ON rq.IdResponsable = rs.IdResponsable
      WHERE re.Activo = 1 {conditions}
    '''
    df = pd.read_sql_query(sql, self.engine, parse_dates=['FechaCreo','FechaModifico','FechaCompletado'])
    df['FechaCreo'] = df['FechaCreo'].dt.strftime('%Y-%m-%d %H:%M:%S')
    df['FechaModifico'] = df['FechaModifico'].dt.strftime('%Y-%m-%d %H:%M:%S')
    df['FechaCompletado'] = df['FechaCompletado'].dt.strftime('%Y-%m-%d %H:%M:%S')
    df['FechaModifico'] = df['FechaModifico'].fillna('1990-01-01 00:00:00')
    df['FechaCompletado'] = df['FechaCompletado'].fillna('1990-01-01 00:00:00')
    return df.to_dict(orient='records')

  def update(self, id: int, body:dict) -> dict:
    if not validator_requerimientos_empleados_modificar.validate(body):
      raise Exception(validator_requerimientos_empleados_modificar.errors)
    req_empleado = self.session.query(RequerimientoEmpleado).get(id)
    if req_empleado == None:
      return None
    for key, value in body.items():
      setattr(req_empleado, key, value)
    req_empleado.FechaModifico = datetime.utcnow()
    self.session.commit()
    return req_empleado.to_dict()

  def remove(self, id:int, body:dict) -> bool:
    if not body_delete.validate(body):
      raise Exception(body_delete.errors)
    req_empleado = self.session.query(RequerimientoEmpleado).get(id)
    if req_empleado == None:
      return False
    req_empleado.Activo = False
    req_empleado.UsuarioModifico = body['UsuarioModifico']
    req_empleado.FechaModifico = datetime.utcnow()
    self.session.commit()
    return True