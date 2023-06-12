from cerberus import Validator

requerimiento_empleado_schema = {
  'IdRequerimiento': {
    'type': 'integer',
    'required': False
  },
  'IdEmpleado': {
    'type': 'integer',
    'required': False
  },
}

validator_requerimientos_empleados_crear = Validator({
  **requerimiento_empleado_schema,
  'UsuarioCreo': {
    'type': 'string',
    'required': True
  }
})
validator_requerimientos_empleados_modificar = Validator({
  **requerimiento_empleado_schema,
  'Completado': {
    'type': 'boolean',
    'required': True
  },
  'FechaCompletado': {
    'type': 'string',
    'required': True
  },
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})