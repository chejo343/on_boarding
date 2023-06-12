import axios from 'axios'

const base = import.meta.env.VITE_AWS
const http = axios.create({
  baseURL: base
})
// http.interceptors.request.use(
//   config => {
//     const userData = JSON.parse(localStorage.getItem('userData'))
//     if (userData) {
//       config.headers.authorizationToken = userData ? `Bearer ${userData.token}` : ''
//     } else {
//       delete http.defaults.headers.common.Authorization;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );
http.interceptors.response.use(
  response => {
    if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
      return response.data.body
    }
    return Promise.reject(response.data)
  },
  error => {
    if(error){
      return Promise.reject(error)
    }
  }
)

export default http