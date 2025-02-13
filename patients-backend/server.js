const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Basic logger //
const logger = {
  info: (msg) => console.log(msg),
  error: (msg) => console.error(msg),
}

// Reusable error handler
const handleError = (res, message, error) => {
  logger.error(`${message}: ${error.message}`)
  return res.status(500).json({ error: message })
}

// Initialize SQLite
const db = new sqlite3.Database(process.env.DB_PATH, (error) => {
  if (error) {
    logger.error(`Failed to connect to SQLite: ${error.message}`)
    process.exit(1)
  }
  logger.info('Connected to the SQLite database')
})

// ----------------- PATIENT ROUTES ---------------- //

// Get all patients
app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients', [], (error, rows) => {
    if (error) return handleError(res, 'Error fetching patients', error)
    return res.json(rows)
  })
})

// Get patient by ID
app.get('/api/patients/:id', (req, res) => {
  db.get(
    'SELECT * FROM patients WHERE id = ?',
    [req.params.id],
    (error, row) => {
      if (error) return handleError(res, 'Error fetching patient', error)
      if (!row) return res.status(404).json({ error: 'Patient not found' })
      return res.json(row)
    }
  )
})

// Add a new patient
app.post('/api/patients', (req, res) => {
  const { name, dob, condition, appointmentDate } = req.body

  if (![name, dob, condition, appointmentDate].every(Boolean)) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const sql =
    'INSERT INTO patients (name, dob, condition, appointment_date) VALUES (?,?,?,?)'
  db.run(sql, [name, dob, condition, appointmentDate], function (error) {
    if (error) return handleError(res, 'Error adding patient', error)
    return res
      .status(201)
      .json({ id: this.lastID, name, dob, condition, appointmentDate })
  })
})

// Update patient
app.put('/api/patients/:id', (req, res) => {
  const { name, dob, condition, appointmentDate } = req.body

  if (![name, dob, condition, appointmentDate].every(Boolean)) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const sql = `
    UPDATE patients
    SET name = ?, dob = ?, condition = ?, appointment_date = ?
    WHERE id = ?
  `
  db.run(
    sql,
    [name, dob, condition, appointmentDate, req.params.id],
    function (error) {
      if (error) return handleError(res, 'Error updating patient', error)
      if (!this.changes)
        return res.status(404).json({ error: 'Patient not found' })
      return res.status(200).json({
        message: 'Patient updated successfully',
        patient: { id: req.params.id, name, dob, condition, appointmentDate },
      })
    }
  )
})

// Delete patient
app.delete('/api/patients/:id', (req, res) => {
  db.run(
    'DELETE FROM patients WHERE id = ?',
    [req.params.id],
    function (error) {
      if (error) return handleError(res, 'Error deleting patient', error)
      if (!this.changes)
        return res.status(404).json({ error: 'Patient not found' })
      return res.status(200).json({ message: 'Patient deleted successfully' })
    }
  )
})

// ------------ APPOINTMENT ROUTES ------------------ //

// Get all appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', [], (error, rows) => {
    if (error) return handleError(res, 'Error fetching appointments', error)
    return res.json(rows)
  })
})

// Add new appointment
app.post('/api/appointments', (req, res) => {
  const { patientId, appointmentDate, details } = req.body

  if (![patientId, appointmentDate, details].every(Boolean)) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const sql =
    'INSERT INTO appointments (patient_id, appointment_date, details) VALUES (?,?,?)'
  db.run(sql, [patientId, appointmentDate, details], function (error) {
    if (error) return handleError(res, 'Error adding appointment', error)
    return res
      .status(201)
      .json({ id: this.lastID, patientId, appointmentDate, details })
  })
})

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  db.run(
    'DELETE FROM appointments WHERE id = ?',
    [req.params.id],
    function (error) {
      if (error) return handleError(res, 'Error deleting appointment', error)
      if (!this.changes)
        return res.status(404).json({ error: 'Appointment not found' })
      return res
        .status(200)
        .json({ message: 'Appointment deleted successfully' })
    }
  )
})

// Start server
app.listen(port, () =>
  logger.info(`Server running on http://localhost:${port}`)
)
