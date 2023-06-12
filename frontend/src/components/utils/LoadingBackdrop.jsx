import React from 'react'
import {
  Backdrop,
  CircularProgress
} from '@mui/material'

const LoadingBackdrop = ({ loading }) => {
  return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
  >
    <CircularProgress color="secondary" />
  </Backdrop>
}

export default LoadingBackdrop
