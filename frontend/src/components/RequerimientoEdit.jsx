import React, { useState } from 'react'
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Box
} from '@mui/material'
import ResponsableSelect from './ResponsableSelect'
import { toast } from 'react-toastify'
import LoadingButton from './utils/LoadingButton'

const RequerimientoEdit = ({ title, onSubmit, onRefresh, onClose }) => {
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    Descripcion: '',
    Responsable: null
  })
  const [errors, setErrors] = useState({})
  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    })
  }
  const validate = () => {
    let tempErrors = {};
    if (!form.Descripcion) {
      tempErrors.Descripcion = 'Este campo es requerido';
    }
    if (!form.Responsable) {
      tempErrors.Responsable = 'Este campo es requerido';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }
  const submit = async () => {
    if (validate()) {
      try {
        setSaving(true)
        const body = {
          Descripcion: form.Descripcion,
          IdResponsable: form.Responsable.IdResponsable
        }
        await onSubmit(body)
        onRefresh()
        toast.success('Registro guardado')
      } catch (error) {
        toast.error('Ha ocurrido un error')
      } finally {
        setSaving(false)
      }
    }
  }
  return <>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          label="Descripción"
          name="Descripcion"
          value={form.Descripcion}
          onChange={handleChange}
          error={Boolean(errors.Descripcion)}
          helperText={errors.Descripcion}
        />
        <ResponsableSelect
          value={form.Responsable}
          onChange={handleChange}
          error={Boolean(errors.Responsable)}
          helperText={errors.Responsable}
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <LoadingButton loading={saving} color="primary" variant="contained" onClick={submit}>Guardar</LoadingButton>
    </DialogActions>
  </>
}

export default RequerimientoEdit
