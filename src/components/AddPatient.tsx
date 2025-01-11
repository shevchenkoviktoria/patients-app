import React, { useState } from 'react'
import { TextField, Button, Box, Stack } from '@mui/material'
import axios from 'axios'

type AddPatientProps = {
  onAddPatient: (newPatient: any) => void
}

const AddPatient: React.FC<AddPatientProps> = ({ onAddPatient }) => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [condition, setCondition] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newPatient = { name, dob, condition, appointmentDate }

    try {
      // Make a POST request to add the new patient
      const response = await axios.post(
        'http://localhost:5000/api/patients',
        newPatient
      )

      // Call the parent onAddPatient callback to update the state in App.tsx
      onAddPatient(response.data)

      // Reset form fields
      setName('')
      setDob('')
      setCondition('')
      setAppointmentDate('')

      // Alert the user that the patient was added
      alert('Patient added successfully')
    } catch (error) {
      console.error('Error adding patient', error)
      alert('Failed to add patient')
    }
  }

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
            InputLabelProps={{
              shrink: true,
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
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="outlined" color="primary">
              Add Patient
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                // Reset the form if the user clicks cancel
                setName('')
                setDob('')
                setCondition('')
                setAppointmentDate('')
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default AddPatient
