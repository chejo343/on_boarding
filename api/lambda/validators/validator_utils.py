from cerberus import Validator

body_delete = Validator({
  'UsuarioModifico': {
    'type': 'string',
    'required': True
  }
})