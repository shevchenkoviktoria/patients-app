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
import { Appoitment } from '../types/Appoitment'

type AppointmentListProps = {
  appointments: Appoitment[]
  onDeleteAppointment: (id: string) => void
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onDeleteAppointment,
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
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.name}</TableCell>

            <TableCell>
              {appointment.appointmentDate
                ? appointment.appointmentDate
                : 'No appointment scheduled'}
            </TableCell>

            <TableCell>
              {onDeleteAppointment && (
                <Tooltip title="Cancel Appointment">
                  <IconButton
                    sx={{ fontSize: 12, color: 'red' }}
                    size="small"
                    color="primary"
                    onClick={() => onDeleteAppointment(appointment.id)}
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
