import React from 'react'
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
  Tooltip,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

type PatientListProps = {
  patients: any[]
  onDeletePatient: (id: number) => void
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onDeletePatient,
}) => {
  const [search, setSearch] = React.useState('')

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/patients/${id}`)
      .then(() => {
        onDeletePatient(id) // Update the parent component's state
        alert('Patient deleted successfully')
      })
      .catch((error) => console.error('Error deleting patient', error))
  }

  return (
    <>
      <Box sx={{ maxWidth: 500 }}>
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit Patient Info">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            alert(`Editing patient ${patient.name}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Patient Info">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleDelete(patient.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  )
}

export default PatientList
