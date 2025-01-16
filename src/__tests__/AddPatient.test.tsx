import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddPatient from '../components/AddPatient'

global.alert = jest.fn()

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({
    data: {
      id: '123',
      name: 'John Doe',
      dob: '01.01.1995',
      condition: 'Flu',
      appointmentDate: '01.05.2024',
    },
  }),
}))

const mockOnAddPatient = jest.fn()

describe('AddPatient Component', () => {
  test('renders the component and submits the form correctly', async () => {
    render(<AddPatient onAddPatient={mockOnAddPatient} />)

    const nameInput = screen.getByLabelText(/Name/i)
    const dobInput = screen.getByLabelText(/Date of Birth/i)
    const conditionInput = screen.getByLabelText(/Medical Condition/i)
    const appointmentDateInput = screen.getByLabelText(/Next Appointment/i)
    const submitButton = screen.getByText(/Add Patient/i)

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } })
    fireEvent.change(conditionInput, { target: { value: 'Flu' } })
    fireEvent.change(appointmentDateInput, { target: { value: '2024-05-01' } })

    fireEvent.click(submitButton)

    const successMessage = await screen.findByText('Patient added successfully')
    expect(successMessage).toBeInTheDocument()

    expect(mockOnAddPatient).toHaveBeenCalledWith({
      id: '123',
      name: 'John Doe',
      dob: '1990-01-01',
      condition: 'Flu',
      appointmentDate: '2024-05-01',
    })

    expect(mockOnAddPatient).toHaveBeenCalledTimes(1)
  })
})
