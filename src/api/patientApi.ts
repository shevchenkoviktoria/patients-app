import axios from 'axios'
import { Patients } from '../types/Patients'
import { handleError } from '../utils/errorHandler'

export const apiUrl = 'http://localhost:5000/api'

export const fetchPatients = async (): Promise<Patients[]> => {
  try {
    const response = await axios.get(`${apiUrl}/patients`)
    return response.data
  } catch (error) {
    handleError('Error fetching patients', error)
    throw error
  }
}

export const deletePatient = async (patientId: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/patients/${patientId}`)
  } catch (error) {
    handleError('Error deleting patient', error)
    throw error
  }
}

export const deleteAppointment = async (
  appointmentId: string
): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/appointments/${appointmentId}`)
  } catch (error) {
    handleError('Error deleting appointment', error)
    throw error
  }
}
