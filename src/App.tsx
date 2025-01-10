import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, Box, Container, Typography } from "@mui/material";

import axios from "axios";
import AddPatient from "./components/AddPatient";
import PatientList from "./components/PatientList";

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [patients, setPatients] = useState<any[]>([]);

  // Fetch patients
  const fetchPatients = () => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients", error));
  };

  useEffect(() => {
    fetchPatients();
  }, []); // Fetch patients on initial render

  // Handle adding a new patient
  const handleAddPatient = (newPatient: any) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div>
      {/* Header with Tabs */}
      <AppBar position="sticky">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="patient-management-tabs"
          centered
        >
          <Tab label="Add New Patient" />
          <Tab label="Patients" />
        </Tabs>
      </AppBar>

      {/* Content of Tabs */}
      <Box sx={{ padding: 3 }}>
        <Container>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Patient Details
              </Typography>
              <AddPatient onAddPatient={handleAddPatient} />
            </Box>
          )}

          {/* Tab 2: Patients (Search and List of Patients) */}
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Patients
              </Typography>
              <PatientList patients={patients} />
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default App;
