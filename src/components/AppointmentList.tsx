import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

type AppointmentListProps = {
  appointments: any[]
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <Box>
      <Typography variant="h6">Upcoming Appointments</Typography>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Patient: ${appointment.name}`}
              secondary={`Next Appointment: ${appointment.appointmentDate}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AppointmentList
