import axios from 'axios'
import { ref } from 'vue'

// Timer state
const timer = ref(null)
const countdown = ref('')
const intervalId = ref(null)

// Inputs for setting the timer
const startTime = ref('')
const endTime = ref('')
const message = ref('')
const apiUrl = import.meta.env.VITE_API_URL

let hasEnded = false
// Fetch Timer Status
export const fetchTimerStatus = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/timer/status`)
    timer.value = response.data.timer

    if (timer.value.isActive && !timer.value.isStoppedManually) {
      startCountdown()
    } else if (timer.value.isStoppedManually) {
      message.value = 'Election has been stopped manually.'
    } else {
      message.value = 'Election has not started yet.'
    }
  } catch (error) {
    console.error('Error fetching timer status:', error)
    message.value = 'Failed to fetch timer status.'
  }
}

// Set Timer
export const setElectionTimer = async () => {
  try {
    const now = new Date()
    const start = new Date(startTime.value)

    await axios.post(`${apiUrl}/api/timer/set-timer`, {
      startTime: start,
      endTime: new Date(endTime.value)
    })

    if (start > now) {
      message.value = 'Starting in 00:01:21' // Example countdown logic
      const startDiff = Math.max(0, start - now)
      countdown.value = formatCountdown(startDiff)
      const countdownInterval = setInterval(() => {
        const remaining = Math.max(0, start - new Date())
        countdown.value = formatCountdown(remaining)
        if (remaining <= 0) {
          clearInterval(countdownInterval)
          startElection()
        }
      }, 1000)
    } else {
      message.value = 'Timer set successfully.'
    }

    fetchTimerStatus()
  } catch (error) {
    console.error('Error setting timer:', error)
    message.value = 'Failed to set timer.'
  }
}

// Start Election
export const startElection = async () => {
  try {
    await axios.post(`${apiUrl}/api/timer/start-election`)
    message.value = 'Election started successfully.'
    fetchTimerStatus()
  } catch (error) {
    console.error('Error starting election:', error)
    message.value = 'Failed to start election.'
  }
}

// Stop Election
export const stopElection = async () => {
  try {
    await axios.post(`${apiUrl}/api/timer/stop-election`)
    message.value = 'Election stopped successfully.'
    fetchTimerStatus()
  } catch (error) {
    console.error('Error stopping election:', error)
    message.value = 'Failed to stop election.'
  }
}

// Countdown Timer
const startCountdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date()
    const end = new Date(timer.value.endTime)
    const diff = end - now

   if (diff <= 0) {
     countdown.value = 'Election has ended.'
     clearInterval(intervalId.value)

     if (!hasEnded) {
       hasEnded = true
       stopElection()
     }
   } else {
     countdown.value = formatCountdown(diff)
   }

  }

  calculateTimeLeft()
  intervalId.value = setInterval(calculateTimeLeft, 1000)
}

const formatCountdown = (ms) => {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  return `${hours.toString().padStart(2, '0')}h ${minutes
    .toString()
    .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
}


export const countdownItems = () => {
  return { countdown, timer, message, startTime, endTime }
}
