from empleados_controller import EmpleadosController

def handle_empleados(method, body, param, query):
  controller = EmpleadosController()
  if method == 'POST':
    empleado = controller.create(body)
    return {
      'statusCode': 200,
      'body': empleado
    }
  elif method == 'GET' and param != None:
    empleado = controller.get_by_id(param)
    return {
      'statusCode': 200,
      'body': empleado
    }
  elif method == 'GET':
    items = controller.get_list()
    return {
      'statusCode': 200,
      'body': items
    }
  elif method == 'PUT' and param != None:
    id = int(param)
    updated = controller.update(id, body)
    if updated != None:
      return {
        'statusCode': 200,
        'body': updated
      }
    return {
      'statusCode': 404,
      'body': 'not found'
    }
  elif method == 'DELETE' and param != None:
    id = int(id)
    deleted = controller.remove(id, body)
    if deleted:
      return {
        'statusCode': 200,
        'body': 'ok'
      }
  else:
    return {
      'statusCode': 404,
      'body': 'not found'
    }
