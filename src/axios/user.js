import axios from 'axios'

/**
 * Get user data using the stored token.
 * Validates if the token is present and sends a GET request.
 * @returns {Promise} Resolves with user data or throws an error if the token is invalid.
 */

const apiUrl = import.meta.env.VITE_API_URL

export const getUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. Please log in.')
  }

  try {
    const response = await axios.get(`${apiUrl}/api/auth/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return [response.data, response.status] // Return user data
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

export const getAdminData = async () => {
  const token = localStorage.getItem('admin-token')
  if (!token) {
    throw new Error('No token found. Please log in.')
  }

  try {
    const response = await axios.get(
      `${apiUrl}/api/admin/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('admin-token') // Remove invalid token
      throw new Error('Invalid or expired token. Please log in again.')
    }
    throw error
  }
}

export const fetchAllPositions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/position/all`)

    // Transform the picture paths
    const transformedData = response.data.map((position) => ({
      ...position,
      candidates: position.candidates.map((candidate) => ({
        ...candidate,
        picture: candidate.picture.replace(/.*\\public\\/, '../../public/').replace(/\\/g, '/')
      }))
    }))

    console.log(transformedData)

    return transformedData // The transformed array of positions
  } catch (error) {
    console.error('Error fetching positions:', error)
    throw error
  }
}


export const checkIfUserHasVoted = async (voterId) => {
  try {
    const response = await axios.post(`${apiUrl}/api/vote/has-voted`, {
      voterId
    })

    if (response.data.hasVoted) {
      console.log('User has already voted.')
    } else {
      console.log('User has not voted yet.')
    }

    return response.data // Optional: return the response for further use
  } catch (error) {
    console.error('Error checking voting status:', error.response?.data || error.message)
    throw error
  }
}

export const sendVerificationEmailFunc = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/verify-email`, { email })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/auth/all-users`)

    // Handle the response data
    console.log(response.data) // Logs the fetched data

    return response.data // Optionally, return the data for further use
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error)
  }
}


