import axios from 'axios'

const DEFAULT_TIMEOUT = 15000
const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const createAxios = (options = {}) => {
  const instance = axios.create({
    baseURL: DEFAULT_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    ...options,
  })

  instance.interceptors.request.use(
    (config) => {
      // Attach auth header here when token storage is decided.
      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Central place to log errors or map HTTP codes if needed.
      return Promise.reject(error)
    },
  )

  return instance
}

// Default shared client for convenience.
export const apiClient = createAxios()

export default apiClient
