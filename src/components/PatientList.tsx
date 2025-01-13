import React, { useState } from 'react'
import {
  TextField,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Button,
} from '@mui/material'
import axios from 'axios'
import { Patients } from '../types/Patients'

type PatientListProps = {
  patients: Patients[]
  onDeletePatient: (id: string) => void
  onUpdatePatient: (updatedPatient: Patients) => void
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onDeletePatient,
  onUpdatePatient,
}) => {
  const [search, setSearch] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patients | null>(null)
  const [updatedName, setUpdatedName] = useState('')
  const [updatedDob, setUpdatedDob] = useState('')
  const [updatedCondition, setUpdatedCondition] = useState('')
  const [updatedAppointmentDate, setUpdatedAppointmentDate] = useState('')

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    onDeletePatient(id)
  }

  const handleEditClick = (patient: Patients) => {
    setSelectedPatient(patient)
    setUpdatedName(patient.name)
    setUpdatedDob(patient.dob)
    setUpdatedCondition(patient.condition)
    setUpdatedAppointmentDate(patient.appointmentDate)
    setEditModalOpen(true)
  }

  const handleSaveChanges = () => {
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        name: updatedName,
        dob: updatedDob,
        condition: updatedCondition,
        appointmentDate: updatedAppointmentDate,
      }

      axios
        .put(
          `http://localhost:5000/api/patients/${selectedPatient.id}`,
          updatedPatient
        )
        .then((response) => {
          onUpdatePatient(response.data)
          setEditModalOpen(false)
          alert('Patient updated successfully')
        })
        .catch((error) => {
          console.error('Error updating patient', error)
          alert('Error updating patient')
        })
    }
  }

  return (
    <>
      <Box sx={{ maxWidth: 600 }}>
        <TextField
          fullWidth
          label="Search Patients"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />
      </Box>
      <Box sx={{ marginTop: 3 }}>
        {filteredPatients.length === 0 ? (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
            No patients found.
          </Typography>
        ) : (
          <TableContainer sx={{ maxWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Appointment at</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>{patient.appointmentDate}</TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ fontSize: 12 }}
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(patient)}
                      >
                        Edit
                      </IconButton>

                      <IconButton
                        sx={{ fontSize: 12, color: 'red' }}
                        size="small"
                        color="primary"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {/* better to create shared component  */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
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
            label="Date of Birth"
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default PatientList
