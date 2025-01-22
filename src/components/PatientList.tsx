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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null)

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleEditClick = (patient: Patients) => {
    setSelectedPatient(patient)
    setEditModalOpen(true)
  }

  const handleSaveChanges = (updatedPatient: Patients) => {
    onUpdatePatient(updatedPatient)
    setEditModalOpen(false)
  }

  const handleDeleteClick = (id: string) => {
    setPatientToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (patientToDelete) {
      onDeletePatient(patientToDelete)
    }
    setDeleteDialogOpen(false)
    setPatientToDelete(null)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setPatientToDelete(null)
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
                  <Tooltip title="Edit patient information">
                    <IconButton
                      sx={{ fontSize: 12 }}
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(patient)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete patient information">
                    <IconButton
                      sx={{ fontSize: 12, color: 'red' }}
                      size="small"
                      color="primary"
                      onClick={() => handleDeleteClick(patient.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {selectedPatient && (
        <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveChanges}
          patient={selectedPatient}
        />
      )}

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this patient? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleCancelDelete}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleConfirmDelete}
            color="secondary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PatientList
