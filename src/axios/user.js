import axios from 'axios'

/**
 * Get user data using the stored token.
 * Validates if the token is present and sends a GET request.
 * @returns {Promise} Resolves with user data or throws an error if the token is invalid.
 */


const BASE_URL = 'http://localhost:5000/api'

export const getUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. Please log in.')
  }

  try {
    const response = await axios.get('http://localhost:5000/api/auth/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data // Return user data
  } catch (error) {
    console.error('Error fetching user data:', error)
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token') // Remove invalid token
      throw new Error('Invalid or expired token. Please log in again.')
    }
    throw error
  }
}



export const fetchAllPositions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/position/all`)
    return response.data // The array of positions
  } catch (error) {
    console.error('Error fetching positions:', error)
    throw error
  }
}

