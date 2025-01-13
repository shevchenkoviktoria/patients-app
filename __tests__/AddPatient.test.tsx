import { render, fireEvent, screen } from '@testing-library/react'
import AddPatient from '../src/components/AddPatient'
import React from 'react'

describe('AddPatient Component', () => {
  it('should allow the user to fill in the form and reset the fields', () => {
    const mockOnAddPatient = jest.fn()

    const patientData = {
      name: 'John Doe',
      dob: '1990-01-01',
      condition: 'Flu',
      appointmentDate: '2023-06-01',
    }

    render(<AddPatient onAddPatient={mockOnAddPatient} />)

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: patientData.name },
    })
    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: patientData.dob },
    })
    fireEvent.change(screen.getByLabelText(/medical condition/i), {
      target: { value: patientData.condition },
    })
    fireEvent.change(screen.getByLabelText(/next appointment/i), {
      target: { value: patientData.appointmentDate },
    })

    // Simulate form submission (without axios, just call the mock function)
    fireEvent.click(screen.getByRole('button', { name: /add patient/i }))

    // Check if mockOnAddPatient is called with the correct data
    expect(mockOnAddPatient).toHaveBeenCalledWith({
      name: patientData.name,
      dob: patientData.dob,
      condition: patientData.condition,
      appointmentDate: patientData.appointmentDate,
      id: '', // id should be empty since we are not testing axios
    })

    // Check if the input fields are reset after submission
    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe('')
    expect(
      (screen.getByLabelText(/date of birth/i) as HTMLInputElement).value
    ).toBe('')
    expect(
      (screen.getByLabelText(/medical condition/i) as HTMLInputElement).value
    ).toBe('')
    expect(
      (screen.getByLabelText(/next appointment/i) as HTMLInputElement).value
    ).toBe('')
  })
})
