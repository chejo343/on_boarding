from cerberus import Validator

puesto_schema = {
  'Nombre': {
    'type': 'string',
    'required': True
  },
  'Descripcion': {
    'type': 'string',
    'required': True
  }
}

validator_puestos_crear = Validator({
  **puesto_schema,
  'UsuarioCreo': {
    'type': 'string',
    'required': True
  }
})
validator_puestos_modificar = Validator({
  **puesto_schema,
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})