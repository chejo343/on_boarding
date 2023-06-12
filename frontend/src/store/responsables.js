import { action, thunk } from 'easy-peasy'
import http from '../utils/http'

export default {
  responsables: [],
  setResponsables: action((state, payload) => {
    state.responsables = payload
  }),
  getResponsables: thunk(async (actions) => {
    const { setResponsables } = actions
    try {
      const data = await http.get('/responsables')
      setResponsables(data)
    } catch (error) {
      throw new Error('Ha ocurrido un error')
    }
  })
}