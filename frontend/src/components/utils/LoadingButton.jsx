import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles'
import { CircularProgress, Button } from '@mui/material'

const styles = theme => ({})

const ButtonComponent = ({ loading, done, ...other }) => {
    if (loading) {
    return (
      <Button {...other} disabled={true}>
        <CircularProgress size={24} color="secondary" />
      </Button>
    )
  } else {
    return (
      <Button {...other} />
    )
  }
}

// LoadingButton.defaultProps = {
//   loading: false,
//   done: false,
//   }

// LoadingButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   loading: PropTypes.bool,
//   done: PropTypes.bool
// }

const LoadingButton = withStyles(styles)(ButtonComponent)

export default LoadingButton