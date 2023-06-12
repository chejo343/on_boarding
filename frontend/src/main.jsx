import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import { ToastContainer } from 'react-toastify'
import router from './Router.jsx'
import store from './store'

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff1744',
      light: '#ff5252',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </React.StrictMode>
  </StoreProvider>,
)
