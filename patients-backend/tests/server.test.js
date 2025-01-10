const request = require('supertest')
const express = require('express')
const app = require('../server')

describe('Patients API', () => {
  it('GET /api/patients should return all patients', async () => {
    const response = await request(app).get('/api/patients')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('POST /api/patients should add a new patient', async () => {
    const newPatient = {
      name: 'Test Patient',
      dob: '2000-01-01',
      condition: 'Testing',
      appointmentDate: '2025-01-15',
    }
    const response = await request(app)
      .post('/api/patients')
      .send(newPatient)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newPatient.name)
  })
})
