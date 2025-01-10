import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import axios from 'axios'
import AddPatient from './components/AddPatient'
import PatientList from './components/PatientList'

function TabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const App: React.FC = () => {
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const [patients, setPatients] = useState<any[]>([])

  // Fetch patients from API
  const fetchPatients = () => {
    axios
      .get('http://localhost:5000/api/patients')
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients', error))
  }

  useEffect(() => {
    fetchPatients()
  }, [])


  const handleAddPatient = (newPatient: any) => {
    setPatients((prevPatients) => [...prevPatients, newPatient])
  }

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex)
  }

  const handleChangeIndex = (index: number) => {
    setTabIndex(index)
  }

  return (
    <div>
      {/* Header with Tabs */}
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="patient-management-tabs"
        >
          <Tab
            label="Add New Patient"
            id="full-width-tab-0"
            aria-controls="full-width-tabpanel-0"
          />
          <Tab
            label="Patients"
            id="full-width-tab-1"
            aria-controls="full-width-tabpanel-1"
          />
        </Tabs>
      </AppBar>

      {/* Swipeable Views for Tab Content */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {/* Tab 1: Add Patient */}
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          <Typography variant="h5" gutterBottom>
            Patient Details
          </Typography>
          <AddPatient onAddPatient={handleAddPatient} />
        </TabPanel>

        {/* Tab 2: Patients (Search and List of Patients) */}
        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
          <Typography variant="h5" gutterBottom>
            Patients
          </Typography>
          <PatientList patients={patients} />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

export default App
