import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

type EditModalProps = {
  open: boolean
  onClose: () => void
  onSave: (updatedPatient: any) => void
  patient: any
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onSave,
  patient,
}) => {
  const [updatedName, setUpdatedName] = useState(patient?.name || '')
  const [updatedDob, setUpdatedDob] = useState(patient?.dob || '')
  const [updatedCondition, setUpdatedCondition] = useState(
    patient?.condition || ''
  )
  const [updatedAppointmentDate, setUpdatedAppointmentDate] = useState(
    patient?.appointmentDate || ''
  )

  const handleSaveChanges = () => {
    const updatedPatient = {
      ...patient,
      name: updatedName,
      dob: updatedDob,
      condition: updatedCondition,
      appointmentDate: updatedAppointmentDate,
    }
    onSave(updatedPatient)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-patient-modal"
      aria-describedby="modal-to-edit-patient-details"
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          padding: 3,
          margin: 'auto',
          top: '20%',
          position: 'relative',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Patient
        </Typography>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          variant="outlined"
          value={updatedDob}
          onChange={(e) => setUpdatedDob(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Condition"
          variant="outlined"
          value={updatedCondition}
          onChange={(e) => setUpdatedCondition(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Next Appointment"
          variant="outlined"
          value={updatedAppointmentDate}
          onChange={(e) => setUpdatedAppointmentDate(e.target.value)}
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Box sx={{ marginTop: 2 }}>
          <Button fullWidth variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditModal
