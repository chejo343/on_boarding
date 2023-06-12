import { Navigate, createHashRouter } from 'react-router-dom'
import Login from './pages/Login'
import App from './pages/App'
import Empleados from './pages/Empleados'
import Puestos from './pages/Puestos'

const router = createHashRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: "",
        element: <Empleados />
      },
      {
        path: "/app/puestos",
        element: <Puestos />
      }
    ]
  }
])

export default router
