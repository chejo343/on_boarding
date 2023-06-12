import { action, thunk } from 'easy-peasy'
import http from '../utils/http'

export default {
  puestos: [],
  requerimientosPuesto: [],
  setPuestos: action((state, payload) => {
    state.puestos = payload
  }),
  setRequerimientosPuesto: action((state, payload) => {
    state.requerimientosPuesto = payload
  }),
  getPuestos: thunk(async (actions) => {
    const { setPuestos } = actions
    try {
      const data = await http.get('/puestos')
      setPuestos(data)
    } catch (error) {
      throw new Error('Ha ocurrido un error')
    }
  }),
  getRequerimientosPuesto: thunk(async (actions, payload) => {
    const { setRequerimientosPuesto } = actions
    const { IdPuesto } = payload
    try {
      const data = await http.get(`/requerimientos?IdPuesto=${IdPuesto}`)
      setRequerimientosPuesto(data)
    } catch (error) {
      throw new Error('Ha ocurrido un error')
    }
  })
}