import axios from 'axios'
import { Patients } from '../types/Patients'
import { handleError } from '../utils/errorHandler'

export const apiUrl = 'http://localhost:7100/api'

// Fetch all patients
export const fetchPatients = async (): Promise<Patients[]> => {
  try {
    const response = await axios.get(`${apiUrl}/patients`)
    return response.data
  } catch (error) {
    handleError('Error fetching patients', error)
    throw error
  }
}

// Add a new patient
export const addPatient = async (
  patientData: Omit<Patients, 'id'>
): Promise<Patients> => {
  try {
    const response = await axios.post(`${apiUrl}/patients`, patientData)
    return response.data
  } catch (error) {
    handleError('Error adding patient', error)
    throw error
  }
}

// Delete a patient
export const deletePatient = async (patientId: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/patients/${patientId}`)
  } catch (error) {
    handleError('Error deleting patient', error)
    throw error
  }
}
