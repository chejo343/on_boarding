import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useStoreState, useStoreActions } from 'easy-peasy'

const ResponsableSelect = ({ value, onChange, error, helperText }) => {
  const { responsables } = useStoreState(state => ({
    responsables: state.responsables
  }))
  const { getResponsables } = useStoreActions(actions => ({
    getResponsables: actions.getResponsables
  }))
  useEffect(() => {
    if (!responsables.length) {
      getResponsables()
    }
  }, [])
  return <Autocomplete
    fullWidth
    value={value}
    options={responsables}
    onChange={(ev, value) => onChange({target: {name: 'Responsable', value}})}
    getOptionLabel={i => i.Nombre}
    renderInput={(params) => <TextField
      {...params}
      label="Responsable"
      error={error}
      helperText={helperText}
    />}
  />
}

export default ResponsableSelect
