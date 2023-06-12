from cerberus import Validator

empleado_schema = {
  'Nombre': {
    'type': 'string',
    'required': True
  },
  'Apellido': {
    'type': 'string',
    'required': True
  },
  'Telefono': {
    'type': 'string',
    'required': False
  },
  'DPI': {
    'type': 'string',
    'required': True
  },
  'Email': {
    'type': 'string',
    'required': False
  },
  'IdPuesto': {
    'type': 'integer',
    'required': True
  }
}

validator_empleado_crear = Validator({
  **empleado_schema,
  'Asignado': {
    'type': 'boolean',
    'required': False
  },
  'UsuarioCreo': {
    'type': 'string',
    'required': True
  }
})
validator_empleado_modificar = Validator({
  'Nombre': {
    'type': 'string',
    'required': False
  },
  'Apellido': {
    'type': 'string',
    'required': False
  },
  'Telefono': {
    'type': 'string',
    'required': False
  },
  'DPI': {
    'type': 'string',
    'required': False
  },
  'Email': {
    'type': 'string',
    'required': False
  },
  'IdPuesto': {
    'type': 'integer',
    'required': False
  },
  'Asignado': {
    'type': 'boolean',
    'required': False
  },
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})