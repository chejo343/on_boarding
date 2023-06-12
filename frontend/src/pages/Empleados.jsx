import React, { useState, useEffect } from 'react'
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Fab,
  Pagination,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Tooltip,
  IconButton
} from '@mui/material'
import {
  useStoreState,
  useStoreActions
} from 'easy-peasy'
import { makeStyles } from '@mui/styles'
import { toast } from 'react-toastify'
import EmpleadosTabla from '../components/EmpleadosTabla'
import LoadingButton from '../components/utils/LoadingButton'
import LoadingBackdrop from '../components/utils/LoadingBackdrop'
import http from '../utils/http'
import { Check, HourglassFull } from '@mui/icons-material'
import dayjs from 'dayjs'

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}))

const Empleados = () => {
  const classes = useStyles()
  const {
    empleados,
    requerimientosPuesto,
    requerimientosEmpleado
  } = useStoreState(state => ({
    empleados: state.empleados,
    requerimientosPuesto: state.requerimientosPuesto,
    requerimientosEmpleado: state.requerimientosEmpleado
  }))
  const {
    getEmpleados,
    getRequerimientosPuesto,
    getRequerimientosEmpleado
  } = useStoreActions(actions => ({
    getEmpleados: actions.getEmpleados,
    getRequerimientosPuesto: actions.getRequerimientosPuesto,
    getRequerimientosEmpleado: actions.getRequerimientosEmpleado
  }))
  const [loading, setLoading] = useState(false)
  const [lock, setLock] = useState(false)
  const [dialogCrear, setDialogCrear] = useState(false)
  const [dialogEditar, setDialogEditar] = useState(false)
  const [selected, setSelected] = useState(null)
  const [dialgoRequerimientos, setDialogRequerimientos] = useState(false)
  const [dialogEstado, setDialogEstado] = useState(false)
  const [saving, setSaving] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      await getEmpleados()
    } catch (error) {
      toast.error('Ha ocurrido un error')
    } finally {
      setLoading(false)
    }
  }

  const showRequeriminetos = async (index) => {
    const item = { ...empleados[index] }
    getRequerimientosPuesto({IdPuesto: item.IdPuesto})
    setSelected(item)
    setDialogRequerimientos(true)
  }
  const saveAsignacion = async () => {
    try {
      setSaving(true)
      for (const r of requerimientosPuesto) {
        await http.post('/requerimientos_empleados', {
          IdRequerimiento: r.IdRequerimiento,
          IdEmpleado: selected.IdEmpleado,
          UsuarioCreo: 'Anonimo'
        })
      }
      await http.put(`/empleados/${selected.IdEmpleado}`, {
        Asignado: true,
        UsuarioModifico: 'Anonimo'
      })
      refresh()
    } catch (error) {
      toast.error('Ha ocurrido un error')
    } finally {
      setSaving(false)
    }
  }
  const showAsignar = (idx) => {
    const item = { ...empleados[idx] }
    setSelected(item)
    getRequerimientosPuesto({IdPuesto: item.IdPuesto})
    setDialogRequerimientos(true)
  }
  const showEstadoAsignacion = (idx) => {
    const item = { ...empleados[idx] }
    setSelected(item)
    getRequerimientosEmpleado({IdEmpleado: item.IdEmpleado})
    setDialogEstado(true)
  }
  const marcarCompletado = async (idx) => {
    if (window.confirm('¿Estas seguro de marcar como completado?')) {
      try {
        setLock(true)
        const item = {...requerimientosEmpleado[idx]}
        await http.put(`/requerimientos_empleados/${item.IdRequerimientoEmpleado}`, {
          FechaCompletado: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          Completado: true,
          UsuarioModifico: 'Anonimo'
        })
        toast.success('Registro guardado')
        getRequerimientosEmpleado({IdEmpleado: selected.IdEmpleado})
      } catch (error) {
        toast.error('Ha ocurrido un error')
      } finally {
        setLock(false)
      }
    }
  }
  const refresh = () => {
    getData()
    setDialogCrear(false)
    setDialogEditar(false)
    setDialogRequerimientos(false)
  }
  useEffect(() => {
    getData()
  }, [])
  return <Paper style={{padding: 10}}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" className={classes.title}>
        Lista de empleados
      </Typography>
    </Box>
    <div className={classes.tabla}>
      <EmpleadosTabla
        items={empleados}
        onEdit={showRequeriminetos}
        showAsignar={showAsignar}
        showAsignacion={showEstadoAsignacion}
      />
    </div>
    { loading && <LinearProgress /> }
    <Dialog
      open={dialgoRequerimientos}
      onClose={() =>  setDialogRequerimientos(false)}
      fullWidth maxWidth="md">
      <DialogTitle>Lista de recursos</DialogTitle>
      <DialogContent>
        <List>
          {
            requerimientosPuesto.map((i, idx) => <ListItem key={idx}>
              <ListItemText primary={i.Descripcion} />
            </ListItem>)
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() =>  setDialogRequerimientos(false)}>Cancelar</Button>
        <LoadingButton loading={saving} onClick={saveAsignacion} variant="contained">
          Asignar
        </LoadingButton>
      </DialogActions>
    </Dialog>
    <Dialog
      open={dialogEstado}
      onClose={() =>  setDialogEstado(false)}
      fullWidth maxWidth="md">
      <DialogTitle>Estado de asignación de recursos</DialogTitle>
      <DialogContent>
        <List>
          {
            requerimientosEmpleado.map((i, idx) => <ListItem key={idx}>
              <ListItemAvatar>
                { i.Completado ? <Check /> : <HourglassFull />} 
              </ListItemAvatar>
              <ListItemText
                primary={`${i.Descripcion} - ${i.Nombre}`}
                secondary={i.Completado ? `Fecha completado: ${i.FechaCompletado}` : 'Pendiente'}
              />
              {
                !i.Completado && <ListItemIcon>
                  <Tooltip title="Marcar como completado">
                    <IconButton onClick={() => marcarCompletado(idx)}>
                      <Check />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
              }
            </ListItem>)
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() =>  setDialogEstado(false)}>Cancelar</Button>
      </DialogActions>
    </Dialog>
    <LoadingBackdrop loading={lock} />
  </Paper>
}

export default Empleados