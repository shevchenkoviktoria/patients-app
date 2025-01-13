import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { Patients } from '../types/Patients'

type AppointmentListProps = {
  patients: Patients[]
}

const AppointmentList: React.FC<AppointmentListProps> = ({ patients }) => {
  return (
    <Box>
      <Typography variant="h6">Upcoming Appointments</Typography>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient.id}>
            <ListItemText
              primary={`Patient: ${patient.name}`}
              secondary={`Next Appointment: ${patient.appointmentDate}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AppointmentList
