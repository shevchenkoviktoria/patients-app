import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import AddPatient from './components/AddPatient'
import PatientList from './components/PatientList'
import AppointmentList from './components/AppointmentList'
import { Patients } from './types/Patients'

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [patients, setPatients] = useState<Patients[]>([])
  const [, setAppointments] = useState<any[]>([])

  const fetchPatients = () => {
    axios
      .get('http://localhost:5000/api/patients')
      .then((response) => {
        setPatients(response.data)
        const appointmentData = response.data.map((patient: Patients) => ({
          name: patient.name,
          nextAppointment: patient.appointmentDate,
        }))
        setAppointments(appointmentData)
      })
      .catch((error) => console.error('Error fetching patients', error))
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleAddPatient = (newPatient: Patients) => {
    setPatients((prevPatients) => [...prevPatients, newPatient])
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      { name: newPatient.name, nextAppointment: newPatient.appointmentDate },
    ])
  }

  const handleUpdatePatient = (updatedPatient: Patients) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    )
  }

  const handleDeletePatient = (patientId: string) => {
    axios
      .delete(`http://localhost:5000/api/patients/${patientId}`)
      .then(() => {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== patientId)
        )
      })
      .catch((error) => console.error('Error deleting patient', error))
  }

  const handleDeleteAppointment = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/appointments/${id}`)
      .then(() => {
        setAppointments((prevAppointment) =>
          prevAppointment.filter((appointment) => appointment.id !== id)
        )
      })
      .catch((error) => console.error('Error deleting appointment', error))
  }

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex)
  }

  return (
    <div>
      <AppBar position="sticky">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="patient-management-tabs"
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Add New Patient" />
          <Tab label="Patients" />
          <Tab label="Appointments" />
          <Tab label="Reports" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>

      <Box
        sx={{
          padding: 3,
          transition: 'opacity 0.5s ease',
          opacity: tabIndex !== null ? 1 : 0,
        }}
      >
        <Container>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Patient Details
              </Typography>
              <AddPatient onAddPatient={handleAddPatient} />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Patients
              </Typography>
              <PatientList
                patients={patients}
                onDeletePatient={handleDeletePatient}
                onUpdatePatient={handleUpdatePatient}
              />
            </Box>
          )}

          {tabIndex === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Appointments
              </Typography>
              <AppointmentList
                patients={patients}
                onDeletePatient={handleDeleteAppointment}
              />
            </Box>
          )}
          {tabIndex === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Reports
              </Typography>
            </Box>
          )}
          {tabIndex === 4 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Settings
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </div>
  )
}

export default App
