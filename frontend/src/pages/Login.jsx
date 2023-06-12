import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  TextField,
  Typography
} from '@mui/material'
import { Lock } from '@mui/icons-material'
import { toast } from 'react-toastify';
import LoadingButton from '../components/utils/LoadingButton';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const validate = () => {
    let tempErrors = {};
    if (!login.username) {
      tempErrors.username = 'Este campo es requerido';
    }
    if (!login.password) {
      tempErrors.password = 'Este campo es requerido';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    })
  }
  const submitLogin = async () => {
    try {
      navigate('/app')
    } catch (error) {
      console.log(error)
      toast.error('No se pudo iniciar sesión, revisa tus credenciales')
    } finally {
      setLoading(false)
    }
  }
  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {import.meta.env.VITE_APP_NAME}
        </Typography>
      </Toolbar>
    </AppBar>
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" style={{height: '100%'}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { marginY: 1 },
            maxWidth: '90%'
          }}
          md={{
            maxWidth: '30%'
          }}
          noValidate
          autoComplete="off"
        >
          <Box display="flex" justifyContent="center">
            <Lock style={{fontSize: 60}} color="secondary" />
          </Box>
          <TextField
            fullWidth
            name="username"
            label="Nombre de usuario"
            value={login.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Constraseña"
            value={login.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <LoadingButton
            loading={loading}
            fullWidth
            color="primary"
            variant="contained"
            onClick={submitLogin}
          >
            Iniciar sesión
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default Login
