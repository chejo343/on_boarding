from cerberus import Validator

requerimiento_schema = {
  'Descripcion': {
    'type': 'string',
    'required': True
  },
  'Estandar': {
    'type': 'boolean',
    'required': True
  },
  'IdPuesto': {
    'type': 'integer',
    'required': False
  },
  'IdResponsable': {
    'type': 'integer',
    'required': False
  },
}

validator_requerimientos_crear = Validator({
  **requerimiento_schema,
  'UsuarioCreo': {
    'type': 'string',
    'required': True
  }
})
validator_requerimientos_modificar = Validator({
  **requerimiento_schema,
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})