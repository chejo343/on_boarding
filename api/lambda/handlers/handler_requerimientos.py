from requerimientos_controller import RequerimientosController

def handle_requerimientos(method, body, param, query):
  controller = RequerimientosController()
  if method == 'POST':
    puesto = controller.create(body)
    return {
      'statusCode': 200,
      'body': puesto
    }
  elif method == 'GET' and param != None:
    puesto = controller.get_by_id(param)
    return {
      'statusCode': 200,
      'body': puesto
    }
  elif method == 'GET':
    items = controller.get_list(query)
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