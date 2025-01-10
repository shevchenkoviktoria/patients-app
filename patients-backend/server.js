const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())

// Database SQLite
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error('Database connection failed: ', err.message)
    return
  }
  console.log('Connected to the SQLite database')
})

// Routes

//Get all patients
app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error('Error fetching patients:', err.message)
      res.status(500).send('Error fetching patients')
    } else {
      console.log('Fetched patients:', rows)
      res.json(rows)
    }
  })
})

//Add a new patient
app.post('/api/patients', (req, res) => {
  const { name, dob, condition, appointmentDate } = req.body
  const query =
    'INSERT INTO patients (name, dob, condition, appointment_date) VALUES (?, ?, ?, ?)'

  db.run(query, [name, dob, condition, appointmentDate], function (err) {
    if (err) {
      res.status(500).send('Error adding patient')
    } else {
      res.status(201).json({
        id: this.lastID,
        name,
        dob,
        condition,
        appointmentDate,
      })
    }
  })
})

//Delete patient

app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM patients WHERE id = ?'

  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).send('Error deleting patient')
    } else {
      res.status(200).send({ message: 'Patient deleted successfully' })
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
