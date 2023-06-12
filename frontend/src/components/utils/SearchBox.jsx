import React from 'react'
import {
  Box,
  TextField,
  IconButton
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Search, Close } from '@mui/icons-material'

const SearchBox = ({ value, onChange, onSubmit, onClear }) => {
  return <Box
    display="flex"
    alignItems="center"
    sx={{background: grey[200], padding: 1, borderRadius: '5px'}}
  >
    <IconButton onClick={onSubmit}>
      <Search />
    </IconButton>
    <TextField
      variant="standard"
      label="Buscar"
      value={value}
      onChange={onChange}
    />
    <IconButton onClick={onClear} sx={{ visibility: value ? 'visible' : 'hidden' }}>
      <Close />
    </IconButton>
  </Box>
}

export default SearchBox
