import React from 'react'
import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Patients } from '../types/Patients'

type AppointmentListProps = {
  patients: Patients[]
  onDeletePatient: (id: string) => void
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  patients,
  onDeletePatient,
}) => {
  return (
    <Box sx={{ maxWidth: 600, marginTop: 3 }}>
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
                <IconButton
                  sx={{ fontSize: 12, color: 'red' }}
                  size="small"
                  color="primary"
                  onClick={() => onDeletePatient(patient.id)}
                >
                  Archive Appointment
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Box>
  )
}

export default AppointmentList
