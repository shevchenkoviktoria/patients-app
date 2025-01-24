import React from 'react'
import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { Appoitment } from '../types/Appointment'

type AppointmentListProps = {
  patients: Appoitment[]
  onDeletePatient: (id: string) => void
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  patients,
  onDeletePatient,
}) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Appointment Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>

            <TableCell>
              {patient.appointmentDate
                ? patient.appointmentDate
                : 'No appointment scheduled'}
            </TableCell>

            <TableCell>
              {onDeletePatient && (
                <Tooltip title="Cancel Appointment">
                  <IconButton
                    sx={{ fontSize: 12, color: 'red' }}
                    size="small"
                    color="primary"
                    onClick={() => onDeletePatient(patient.id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Box>
  )
}

export default AppointmentList
