import React, { useState } from 'react'
import { TextField, Button, Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { Patients } from '../types/Patients'
import { handleError } from '../utils/errorHandler'

type AddPatientProps = {
  onAddPatient: (newPatient: Patients) => void
}

const AddPatient: React.FC<AddPatientProps> = ({ onAddPatient }) => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [condition, setCondition] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const patientData = {
      id: '123',
      name: name,
      dob: dob,
      condition: condition,
      appointmentDate: appointmentDate,
    }

    try {
      await axios.post('/api/patients', patientData)
      onAddPatient(patientData)
      setSuccessMessage('Patient added successfully')
      setErrorMessage('')
      setName('')
      setDob('')
      setCondition('')
      setAppointmentDate('')
    } catch (error) {
      handleError('Error adding patient', error)
      setErrorMessage('Failed to add patient')
      setSuccessMessage('')
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
            <Button type="submit" variant="contained" color="primary">
              Add Patient
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setName('')
                setDob('')
                setCondition('')
                setAppointmentDate('')
                setSuccessMessage('')
                setErrorMessage('')
              }}
            >
              Cancel
            </Button>
          </Stack>

          {successMessage && (
            <Typography color="green" sx={{ marginTop: 2 }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography color="red" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Stack>
      </form>
    </Box>
  )
}

export default AddPatient
