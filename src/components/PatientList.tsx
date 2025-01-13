import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Patients } from '../types/Patients'
import EditModal from './EditModal'

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

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    onDeletePatient(id)
  }

  const handleEditClick = (patient: Patients) => {
    setSelectedPatient(patient)
    setEditModalOpen(true)
  }

  const handleSaveChanges = (updatedPatient: Patients) => {
    onUpdatePatient(updatedPatient)
    setEditModalOpen(false)
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
      </Box>

      {/* Use the shared EditModal component */}
      {selectedPatient && (
        <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveChanges}
          patient={selectedPatient}
        />
      )}
    </>
  )
}

export default PatientList
