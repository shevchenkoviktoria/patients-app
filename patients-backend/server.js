const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Database SQLite
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error('Database connection failed: ', err.message)
    return
  }
  console.log('Connected to the SQLite database')
})

// Routes

// Get all patients
app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error('Error fetching patients:', err.message)
      return res.status(500).json({ error: 'Error fetching patients' })
    }
    res.json(rows)
  })
})

// Get patient by ID
app.get('/api/patients/:id', (req, res) => {
  const { id } = req.params
  const query = 'SELECT * FROM patients WHERE id = ?'

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error fetching patient:', err.message)
      return res.status(500).json({ error: 'Error fetching patient' })
    }

    if (!row) {
      return res.status(404).json({ error: 'Patient not found' })
    }

    res.json(row)
  })
})

// Add a new patient
app.post('/api/patients', (req, res) => {
  const { name, dob, condition, appointmentDate } = req.body

  if (!name || !dob || !condition || !appointmentDate) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const query =
    'INSERT INTO patients (name, dob, condition, appointment_date) VALUES (?, ?, ?, ?)'

  db.run(query, [name, dob, condition, appointmentDate], function (err) {
    if (err) {
      console.error('Error adding patient:', err.message)
      return res.status(500).json({ error: 'Error adding patient' })
    }
    res.status(201).json({
      id: this.lastID,
      name,
      dob,
      condition,
      appointmentDate,
    })
  })
})

// Delete patient
app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM patients WHERE id = ?'

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting patient:', err.message)
      return res.status(500).json({ error: 'Error deleting patient' })
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Patient not found' })
    }
    res.status(200).json({ message: 'Patient deleted successfully' })
  })
})

// Update patient
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params
  const { name, dob, condition, appointmentDate } = req.body

  if (!name || !dob || !condition || !appointmentDate) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const query =
    'UPDATE patients SET name = ?, dob = ?, condition = ?, appointment_date = ? WHERE id = ?'
  db.run(query, [name, dob, condition, appointmentDate, id], function (err) {
    if (err) {
      console.error('Error updating patient:', err.message)
      return res.status(500).json({ error: 'Error updating patient' })
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Patient not found' })
    }
    res.status(200).json({
      message: 'Patient updated successfully',
      patient: { id, name, dob, condition, appointmentDate },
    })
  })
})

// Appointment Routes

// Get all appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', [], (err, rows) => {
    if (err) {
      console.error('Error fetching appointments:', err.message)
      return res.status(500).json({ error: 'Error fetching appointments' })
    }
    res.json(rows)
  })
})

// Add new appointment
app.post('/api/appointments', (req, res) => {
  const { patientId, appointmentDate, details } = req.body

  // Validate input
  if (!patientId || !appointmentDate || !details) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const query =
    'INSERT INTO appointments (patient_id, appointment_date, details) VALUES (?, ?, ?)'

  db.run(query, [patientId, appointmentDate, details], function (err) {
    if (err) {
      console.error('Error adding appointment:', err.message)
      return res.status(500).json({ error: 'Error adding appointment' })
    }
    res.status(201).json({
      id: this.lastID,
      patientId,
      appointmentDate,
      details,
    })
  })
})

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM appointments WHERE id = ?'

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting appointment:', err.message)
      return res.status(500).json({ error: 'Error deleting appointment' })
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.status(200).json({ message: 'Appointment deleted successfully' })
  })
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
