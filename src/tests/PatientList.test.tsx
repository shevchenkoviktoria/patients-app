import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PatientList from '../components/PatientList'

const mockPatients = [
  { id: 1, name: 'John Doe', dob: '1980-01-01', condition: 'Flu' },
  { id: 2, name: 'Jane Smith', dob: '1990-05-15', condition: 'Cold' },
]

describe('PatientList Component', () => {
  test('renders patients correctly', () => {
    render(<PatientList patients={mockPatients} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  test('filters patients based on search input', () => {
    render(<PatientList patients={mockPatients} />)
    const searchInput = screen.getByLabelText('Search Patients')
    fireEvent.change(searchInput, { target: { value: 'Jane' } })

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })
})
