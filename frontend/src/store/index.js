import { createStore } from 'easy-peasy'
import utils from './utils'
import empleados from './empleados'
import puestos from './puestos'
import responsables from './responsables'

export default createStore({
  ...utils,
  ...empleados,
  ...puestos,
  ...responsables
})
