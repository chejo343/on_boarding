from cerberus import Validator

responsable_schema = {
  'Nombre': {
    'type': 'string',
    'required': True
  },
  'Descripcion': {
    'type': 'string',
    'required': True
  },
  'Email': {
    'type': 'string',
    'required': True
  }
}

validator_responsables_crear = Validator({
  **responsable_schema,
  'UsuarioCreo': {
    'type': 'string',
    'required': True
  }
})
validator_responsables_modificar = Validator({
  **responsable_schema,
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})