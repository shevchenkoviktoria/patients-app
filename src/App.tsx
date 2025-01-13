import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import AddPatient from './components/AddPatient'
import PatientList from './components/PatientList'
import AppointmentList from './components/AppointmentList'

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [patients, setPatients] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  const fetchPatients = () => {
    axios
      .get('http://localhost:5000/api/patients')
      .then((response) => {
        setPatients(response.data)
        const appointmentData = response.data.map((patient: any) => ({
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

  const handleAddPatient = (newPatient: any) => {
    setPatients((prevPatients) => [...prevPatients, newPatient])
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      { name: newPatient.name, nextAppointment: newPatient.appointmentDate },
    ])
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

  const handleTabChange = (
    event: React.SyntheticEvent,
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
          sx={{
            transition: 'transform 0.3s ease',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Tab
            label="Add New Patient"
            sx={{
              fontWeight: tabIndex === 0 ? 'bold' : 'normal',
              color: tabIndex === 0 ? 'primary.main' : 'text.primary',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Patients"
            sx={{
              fontWeight: tabIndex === 1 ? 'bold' : 'normal',
              color: tabIndex === 1 ? 'primary.main' : 'text.primary',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Appointments"
            sx={{
              fontWeight: tabIndex === 2 ? 'bold' : 'normal',
              color: tabIndex === 2 ? 'primary.main' : 'text.primary',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Settings"
            sx={{
              fontWeight: tabIndex === 3 ? 'bold' : 'normal',
              color: tabIndex === 3 ? 'primary.main' : 'text.primary',
              textTransform: 'none',
            }}
          />
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
              />
            </Box>
          )}
          {tabIndex === 2 && (
            <Box>
              <AppointmentList patients={patients} />
            </Box>
          )}
          {tabIndex === 3 && (
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
