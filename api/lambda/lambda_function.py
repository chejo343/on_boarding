import json
from datetime import datetime
from handler_empleados import handle_empleados
from handler_puestos import handle_puestos
from handler_requerimientos import handle_requerimientos
from handler_responsables import handle_responsables
from handler_requerimientos_empleados import handle_requerimientos_empleados

def lambda_handler(event, context):
  method = event['method']
  params = event['pathParams']
  recurso = params.get('recurso', None)
  param = params.get('param', None)
  query = event['queryParams']
  body = event['body']
  try:
    if recurso == 'empleados':
      return handle_empleados(method, body, param, query)
    if recurso == 'puestos':
      return handle_puestos(method, body, param, query)
    if recurso == 'requerimientos':
      return handle_requerimientos(method, body, param, query)
    if recurso == 'responsables':
      return handle_responsables(method, body, param, query)
    if recurso == 'requerimientos_empleados':
      return handle_requerimientos_empleados(method, body, param, query)
  except Exception as e:
    return {
      'statusCode': 500,
      'body': str(e)
    }
  return {
    'statusCode': 405,
    'body': json.dumps('method not allowed')
  }