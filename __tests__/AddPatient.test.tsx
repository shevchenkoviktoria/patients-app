import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import AddPatient from '../src/components/AddPatient'

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn(),
}))

const axiosPostMock = axios.post as jest.Mock

describe('AddPatient Component', () => {
  test('renders the component and submits the form correctly', async () => {
    const mockOnAddPatient = jest.fn()
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

    axiosPostMock.mockResolvedValue({
      data: {
        id: '123',
        name: 'John Doe',
        dob: '1990-01-01',
        condition: 'Flu',
        appointmentDate: '2024-05-01',
      },
    })

    fireEvent.click(submitButton)

    const successMessage = await screen.findByText('Patient added successfully')
    expect(successMessage).toBeInTheDocument()

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/patients',
      expect.objectContaining({
        name: 'John Doe',
        dob: '1990-01-01',
        condition: 'Flu',
        appointmentDate: '2024-05-01',
      })
    )

    expect(mockOnAddPatient).toHaveBeenCalledTimes(1)
  })
})
