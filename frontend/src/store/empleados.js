import { action, thunk } from 'easy-peasy'
import http from '../utils/http'

export default {
  empleados: [],
  requerimientosEmpleado: [],
  setEmpleados: action((state, payload) => {
    state.empleados = payload
  }),
  setRequerimientosEmpleado: action((state, payload) => {
    state.requerimientosEmpleado = payload
  }),
  getEmpleados: thunk(async (actions) => {
    const { setEmpleados } = actions
    try {
      const data = await http.get('/empleados')
      setEmpleados(data)
    } catch (error) {
      throw new Error('Ha ocurrido un error')
    }
  }),
  getRequerimientosEmpleado: thunk(async (actions, payload) => {
    const { setRequerimientosEmpleado } = actions
    const { IdEmpleado } = payload
    try {
      const data = await http.get(`/requerimientos_empleados?IdEmpleado=${IdEmpleado}`)
      setRequerimientosEmpleado(data)
    } catch (error) {
      console.log(error)
      throw new Error('Ha ocurrido un error')
    }
  })
}