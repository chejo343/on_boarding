import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Grid,
  LinearProgress,
  Box,
  Fab,
  Paper,
  Alert,
  Dialog
} from '@mui/material'
import {
  Add
} from '@mui/icons-material'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { toast } from 'react-toastify'
import RequerimientoEdit from '../components/RequerimientoEdit'
import http from '../utils/http'

const Puestos = () => {
  const { puestos, requerimientosPuesto } = useStoreState(state => ({
    puestos: state.puestos,
    requerimientosPuesto: state.requerimientosPuesto
  }))
  const { getPuestos, getRequerimientosPuesto } = useStoreActions(actions => ({
    getPuestos: actions.getPuestos,
    getRequerimientosPuesto: actions.getRequerimientosPuesto
  }))
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [dialogCreate, setDialogCreate] = useState(false)
  const getListaPuestos = async () => {
    try {
      setLoading(true)
      await getPuestos()
    } catch (error) {
      toast.error('Ha ocurrido un error')
    } finally {
      setLoading(false)
    }
  }
  const getRequerimientos = async (index) => {
    const item = { ...puestos[index] }
    setSelected(item)
    getRequerimientosPuesto(item)
  }
  const saveRequerimiento = async (form) => {
    await http.post('/requerimientos', {
      ...form,
      IdPuesto: selected.IdPuesto,
      Estandar: true,
      UsuarioCreo: 'Anonimo'
    })
  }
  const refresh = () => {
    getRequerimientosPuesto(selected)
    setDialogCreate(false)
  }
  useEffect(() => {
    getListaPuestos()
  }, [])
  return <Paper style={{padding: 10}}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" style={{height: 40}}>Lista de puestos</Typography>
        <List sx={{height: '70vh', overflowY: 'auto', border: '1px solid #000'}}>
          {
            puestos.map((i, idx) => <ListItemButton key={idx} onClick={() => getRequerimientos(idx)}>
              <ListItemText primary={i.Nombre} />
            </ListItemButton>)
          }
          {
            loading && <LinearProgress />
          }
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Recursos por puesto</Typography>
          <Fab
            onClick={() => setDialogCreate(true)}
            disabled={!Boolean(selected)}
            size="small"
            color="secondary"
          >
            <Add />
          </Fab>
        </Box>
        <List sx={{height: '70vh', overflowY: 'auto', border: '1px solid #000'}}>
          {
            requerimientosPuesto.map((i, idx) => <ListItemButton key={idx}>
              <ListItemText primary={i.Descripcion} />
            </ListItemButton>)
          }
          {
            !requerimientosPuesto.length && <Alert severity="info" variant="filled">
              No hay registros
            </Alert>
          }
        </List>
      </Grid>
    </Grid>
    <Dialog maxWidth="md" fullWidth open={dialogCreate}>
      <RequerimientoEdit
        title="Crear recurso"
        onSubmit={saveRequerimiento}
        onClose={() =>  setDialogCreate(false)}
        onRefresh={refresh}
      />
    </Dialog>
  </Paper>
}

export default Puestos
