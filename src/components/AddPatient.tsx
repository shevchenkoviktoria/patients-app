import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import axios from "axios";

type AddPatientProps = {
  onAddPatient: (newPatient: any) => void;
};

const AddPatient: React.FC<AddPatientProps> = ({ onAddPatient }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [condition, setCondition] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = { name, dob, condition, appointmentDate };

    axios
      .post("http://localhost:5000/api/patients", newPatient)
      .then((response) => {
        onAddPatient(response.data);
        setName("");
        setDob("");
        setCondition("");
        setAppointmentDate("");
        alert("Patient added successfully");
      })
      .catch((error) => console.error("Error adding patient", error));
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ maxWidth: 500 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            variant="outlined"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            sx={{ maxWidth: 500 }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            fullWidth
            label="Medical Condition"
            variant="outlined"
            multiline
            rows={4}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            sx={{ maxWidth: 500 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Next Appointment"
            variant="outlined"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            sx={{ maxWidth: 500 }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="outlined" color="primary">
              Add Patient
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AddPatient;
