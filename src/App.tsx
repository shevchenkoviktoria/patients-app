import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Container,
  Typography,
  CssBaseline,
  Divider,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import AddPatient from './components/AddPatient'
import PatientList from './components/PatientList'
import AppointmentList from './components/AppointmentList'
import { Patients } from './types/Patients'
import { deletePatient, fetchPatients } from './api/patientApi'
import { handleError } from './utils/errorHandler'
import theme, { useResponsive } from './theme/theme'

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [patients, setPatients] = useState<Patients[]>([])
  const [, setAppointments] = useState<any[]>([])

  const { isSmallScreen } = useResponsive()

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
        handleError('Error loading patients', error)
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
      handleError('Error deleting patient', error)
    }
  }

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="sticky" color="primary">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="patient-management-tabs"
            centered={!isSmallScreen}
            variant={isSmallScreen ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="Add New Patient" />
            <Tab label="Patients" />
            <Tab label="Appointments" />
            <Tab label="Medical History" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>

        <Box
          sx={{
            padding: 3,
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
          }}
        >
          <Container maxWidth={isSmallScreen ? 'sm' : 'lg'}>
            {tabIndex === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Patient Details
                </Typography>
                <Divider />
                <AddPatient onAddPatient={handleAddPatient} />
              </Box>
            )}

            {tabIndex === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Patients
                </Typography>
                <Divider />
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
                <Divider />
                <AppointmentList
                  patients={patients}
                  onDeletePatient={handleDeletePatient}
                />
              </Box>
            )}

            {tabIndex === 3 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Medical History
                </Typography>
                <Divider />
              </Box>
            )}

            {tabIndex === 4 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Settings
                </Typography>
                <Divider />
              </Box>
            )}
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default App
