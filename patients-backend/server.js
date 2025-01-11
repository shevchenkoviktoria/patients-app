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

// Add a new patient
app.post('/api/patients', (req, res) => {
  const { name, dob, condition, appointmentDate } = req.body

  // Validate input
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
