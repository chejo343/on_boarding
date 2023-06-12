import React from 'react'
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Tooltip,
  IconButton
} from '@mui/material'
import { red, green } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import {
  Edit,
  Delete,
  PointOfSale,
  ReceiptLong,
  Assignment,
  AssignmentTurnedIn
} from '@mui/icons-material'

const useStyles = makeStyles(theme => ({
  table: {
    height: '70vh',
    overflowY: 'auto'
  }
}))

const tableCols = [
  'No.',
  'Nombre',
  'DPI',
  'Teléfono',
  'Email',
  'Puesto',
  'Opciones'
]

const EmpleadosTabla = ({items, showAsignar, showAsignacion}) => {
  const classes = useStyles()
  return <TableContainer className={classes.table}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {
            tableCols.map((i, idx) => <TableCell key={idx}>{i}</TableCell>)
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          items.map((i, idx) => <TableRow key={idx}>
            <TableCell>{idx+1}</TableCell>
            <TableCell>{i.Nombre} {i.Apellido}</TableCell>
            <TableCell>{i.DPI}</TableCell>
            <TableCell>{i.Telefono || 'N/A'}</TableCell>
            <TableCell>{i.Email || 'N/A'}</TableCell>
            <TableCell>{i.Puesto || 'N/A'}</TableCell>
            <TableCell>
              {
                !i.Asignado
                ? <Tooltip title="Asignar recursos">
                  <IconButton onClick={() => showAsignar(idx)}>
                    <Assignment />
                  </IconButton>
                </Tooltip>
                : <Tooltip title="Ver asignacion">
                  <IconButton onClick={() => showAsignacion(idx)}>
                    <AssignmentTurnedIn />
                  </IconButton>
                </Tooltip>
              }
            </TableCell>
          </TableRow>)
        }
      </TableBody>
    </Table>
  </TableContainer>
}

export default EmpleadosTabla
