import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box, Container, Typography } from '@mui/material'
import AddPatient from './components/AddPatient'
import PatientList from './components/PatientList'
import AppointmentList from './components/AppointmentList'
import { Patients } from './types/Patients'
import {
  deleteAppointment,
  deletePatient,
  fetchPatients,
} from './api/patientApi'
import { handleError } from './utils/errorHandler'

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [patients, setPatients] = useState<Patients[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const fetchedPatients = await fetchPatients()
        setPatients(fetchedPatients)

        const appointmentData = fetchedPatients.map((patient) => ({
          name: patient.name,
          nextAppointment: patient.appointmentDate,
        }))
        setAppointments(appointmentData)
      } catch (error) {
        console.error('Error loading patients', error)
      }
    }
    loadPatients()
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

  const handleDeletePatient = async (patientId: string) => {
    try {
      await deletePatient(patientId)
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== patientId)
      )
    } catch (error) {
      console.error('Error deleting patient', error)
    }
  }

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await deleteAppointment(appointmentId)
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      )
    } catch (error) {
      handleError('Error deleting appointment', error)
    }
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
