import apiClient from './instance'
import { mapErrorCode } from '../utils/errorCodeMessages.js'

export const fetchSpeedWords = async (params) => {
  const response = await apiClient.get('/speed/words', { params })
  const { success = true, data, errorCode } = response?.data || {}

  if (success === false) {
    const error = new Error(mapErrorCode(errorCode))
    error.code = errorCode
    throw error
  }

  return data
}

export const postSpeedResultsBatch = async (results) => {
  const response = await apiClient.post('/speed/results/batch', { results })
  const { success = true, data, errorCode } = response?.data || {}

  if (success === false) {
    const error = new Error(mapErrorCode(errorCode))
    error.code = errorCode
    throw error
  }

  return data
}
