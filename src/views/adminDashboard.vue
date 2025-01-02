<script setup>
// import NavBar from '@/components/NavBar.vue'
import { getAdminData, fetchAllPositions, fetchAllUsers } from '@/axios/user'
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const userData = ref(null)
const positions = ref([])
const allUsersData = ref([])
const backendURI = 'http://localhost:5000'

onMounted(async () => {
  try {
    const user = await getAdminData()
    const allUers = await fetchAllUsers()
    userData.value = user
    allUsersData.value = allUers
  } catch (error) {
    console.error(error)
    router.push('/admin-login')
  } finally {
    // isLoading.value = false
  }
})

// // Method to capitalize the first letter
// const capitalizeFirstLetter = (str) => {
//   if (!str) return ''
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
// }

// Fetch all positions
onMounted(async () => {
  try {
    positions.value = await fetchAllPositions()
  } catch (error) {
    console.error('Failed to load positions:', error)
  }
})

const baseURL = 'http://localhost:5173'

// Computed property to update only the filePath
const updatedPositions = computed(() =>
  positions.value.map((position) => ({
    ...position,
    candidates: position.candidates.map((candidate) => ({
      ...candidate,
      filePath: candidate.picture
        ? candidate.picture
            .replace(
              'C:\\Users\\Simeon\\OneDrive\\Documents\\coding\\speunibenvoting\\public',
              baseURL
            )
            .replace(/\\/g, '/')
        : '' // Use an empty string or provide a default value
    }))
  }))
)

// Watch updatedPositions for changes and log it
watch(
  updatedPositions,
  (newVal) => {
    // console.log('Updated positions:', newVal)
    return newVal
  },
  { deep: true }
)

// const sendVerificationEmail = async()=>{
//   try{
//     const userData = await getAdminData()
//     await sendVerificationEmailFunc(userData?.email)
//   }catch(err){
//     console.log(err);
//   }
// }

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const name = ref('')
const candidate = ref('')
const picture = ref(null)

const showForm = ref(false) // Toggle state for the form

const toggleForm = () => {
  showForm.value = !showForm.value // Toggle visibility
}

const onFileChange = (event) => {
  picture.value = event.target.files[0]
}

const addCandidate = async () => {
  try {
    const formData = new FormData()
    formData.append('name', name.value)

    // Automatically format the single candidate input as JSON array
    formData.append('candidates', JSON.stringify([{ name: candidate.value }]))

    formData.append('picture', picture.value)

    const response = await axios.post('http://localhost:5000/api/position/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('Response:', response.data)
  } catch (error) {
    console.error('Error adding position:', error.response ? error.response.data : error.message)
  }
}

const isOverlayVisible = ref(false)
// Form state
const form = ref({
  candidateName: '',
  positionName: '',
  file: null,
  candidateId: null,
  positionId: null
})

const ids = ref({
  candidateId: null,
  positionId: null
})

function openUpdateForm(candidateId, positionId) {
  // Find the candidate and position to fill the form
  const position = positions.value.find((pos) => pos.id === positionId)
  const candidate = position?.candidates.find((cand) => cand.id === candidateId)

  // Set the form values
  if (candidate) {
    form.value.candidateName = candidate.name
    form.value.candidateId = candidate._id
    form.value.positionId = position._id
    form.value.positionName = position.name
    isOverlayVisible.value = true // Show the overlay

    ids.value.candidateId = candidate._id
    ids.value.positionId = position._id
  }
}

function onFileChange1(event) {
  form.value.file = event.target.files[0]
}

function hideOverlay() {
  isOverlayVisible.value = false
  form.value = {
    candidateName: '',
    positionName: '',
    file: null,
    candidateId: null,
    positionId: null
  } // Reset form
}

// Update candidate function
async function updateCandidate() {
  const { candidateId, positionId, candidateName, file } = form.value

  const formData = new FormData()
  formData.append('name', candidateName)
  if (file) {
    formData.append('picture', file)
  }

  try {
    const response = await axios.put(
      `http://localhost:5000/api/position/${positionId}/candidate/${candidateId}/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log('Update successful:', response.data)

    // Optionally update the local state with the new data
    const position = positions.value.find((pos) => pos.id === positionId)
    if (position) {
      const candidate = position.candidates.find((cand) => cand.id === candidateId)
      if (candidate) {
        candidate.name = candidateName
        if (file) {
          candidate.picture = URL.createObjectURL(file) // Update image preview locally
        }
      }
    }
  } catch (error) {
    console.error('Error updating candidate:', error.response?.data || error.message)
  } finally {
    hideOverlay()
  }
}

async function deleteCandidate() {
  const { candidateId, positionId } = ids.value

  if (!positionId || !candidateId) {
    console.error('Position ID or Candidate ID is missing!')
    return
  }

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/position/${positionId}/candidate/${candidateId}/delete`
    )
    console.log('Candidate deleted successfully:', response.data)
  } catch (error) {
    console.error('Error deleting candidate:', error.response?.data || error.message)
  }
  hideOverlay()
}

const searchQuery = ref('') // For search input
const selectedLevel = ref('none') // For level filter

// Computed property to filter data
const filteredUsers = computed(() => {
  return allUsersData.value.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.matno.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLevel =
      selectedLevel.value === 'none' || user.level === Number(selectedLevel.value)
    return matchesSearch && matchesLevel
  })
})

// Timer state
const timer = ref(null)
const countdown = ref('')
const intervalId = ref(null)

// Inputs for setting the timer
const startTime = ref('')
const endTime = ref('')
const message = ref('')

// Fetch Timer Status
const fetchTimerStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/timer/status')
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
const setElectionTimer = async () => {
  try {
    const now = new Date()
    const start = new Date(startTime.value)

    await axios.post('http://localhost:5000/api/timer/set-timer', {
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
const startElection = async () => {
  try {
    await axios.post('http://localhost:5000/api/timer/start-election')
    message.value = 'Election started successfully.'
    fetchTimerStatus()
  } catch (error) {
    console.error('Error starting election:', error)
    message.value = 'Failed to start election.'
  }
}

// Stop Election
const stopElection = async () => {
  try {
    await axios.post('http://localhost:5000/api/timer/stop-election')
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

      // Check to prevent multiple status fetches
      if (timer.value && !timer.value.hasEnded) {
        timer.value.hasEnded = true // Mark as ended to prevent repeated fetches
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

onMounted(fetchTimerStatus)
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <h1 class="brand">Election System</h1>
      <button class="menu-btn" @click="toggleMenu">☰</button>
    </nav>

    <!-- Offcanvas Menu -->
    <div class="offcanvas" :class="{ open: isMenuOpen }">
      <button class="close-btn" @click="toggleMenu">&times;</button>
      <ul class="menu-list">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Voters</a></li>
        <li><a href="#">Candidates</a></li>
        <li><a href="#">Results</a></li>
        <li><a href="#">System Logs</a></li>
      </ul>
    </div>

    <!-- Main Content -->
    <main class="content">
      <h2 v-if="userData && userData.nickname" class="greetings">
        Welcome, {{ userData.nickname }}!
      </h2>
      <div class="actions">
        <div class="action-wrap">
          <h2 class="action-title">Timer</h2>
          <div class="action">
            <div v-if="timer" class="action-item">
              <h3>Start/End Election</h3>
              <p>Start the election or end the election</p>
              <button @click="startElection" :disabled="timer?.isActive" class="hidden-btn">
                Start Election
              </button>
              <button @click="stopElection" :disabled="!timer?.isActive" class="hidden-btn">
                Stop Election
              </button>
              <p style="color: green;">{{ message }}</p>
              <p v-if="timer.isActive && !timer.isStoppedManually" class="contdown-time">{{ countdown }}</p>
            </div>
            <div class="action-item">
              <h3>Countdown Timer Settings</h3>
              <p>Set the countdown timer for the election</p>
              <input
                type="datetime-local"
                v-model="startTime"
                placeholder="Start Time"
                class="styled-input"
              />
              <input
                type="datetime-local"
                v-model="endTime"
                placeholder="End Time"
                class="styled-input"
              />
              <button @click="setElectionTimer" class="set-timer">Set Timer</button>
            </div>
          </div>
        </div>

        <div class="action-wrap">
          <h2 class="action-title">Upload Candidates</h2>
          <div class="action">
            <div class="action-item">
              <h3>Upload Data and Results</h3>
              <p>Upload voter data, candidate data, and election results</p>
              <button @click="toggleForm">Upload Now</button>

              <transition name="fade">
                <form v-if="showForm" @submit.prevent="addCandidate" class="add-candidate">
                  <div class="control">
                    <input type="text" v-model="name" placeholder="Position Name" />
                  </div>

                  <div class="control">
                    <input
                      type="text"
                      v-model="candidate"
                      placeholder="Candidate Name (e.g., May)"
                    />
                  </div>

                  <div class="control">
                    <input type="file" @change="onFileChange" />
                  </div>

                  <button type="submit">Add Candidate</button>
                </form>
              </transition>
            </div>
          </div>
        </div>
        <div class="action-wrap">
          <h2 class="action-title">Manage Candidates</h2>
          <div>
            <div class="action candidate-action">
              <div v-for="position in positions" :key="position.id" class="action-content">
                <div
                  v-for="candidate in position.candidates"
                  :key="candidate.id"
                  class="action-item img"
                >
                  <div class="three-dot" @click="openUpdateForm(candidate.id, position.id)">:</div>
                  <div class="img">
                    <img :src="`${backendURI}/${candidate.picture}`" :alt="candidate.name" />
                  </div>
                  <h4>{{ candidate.name }}</h4>
                  <p>{{ position.name }}</p>
                </div>
              </div>
            </div>

            <!-- Overlay Form -->
            <div v-if="isOverlayVisible" class="overlay">
              <div class="overlay-content">
                <!-- X Button -->
                <div class="close-icon" @click="hideOverlay">×</div>

                <form class="add-candidate" @submit.prevent="updateCandidate" :readonly="true">
                  <div class="control">
                    <input type="text" v-model="form.positionName" placeholder="Position Name" />
                  </div>
                  <div class="control">
                    <input
                      type="text"
                      v-model="form.candidateName"
                      placeholder="Candidate Name (e.g., May)"
                    />
                  </div>
                  <div class="control">
                    <input type="file" @change="onFileChange1" />
                  </div>
                  <button type="submit">Update Candidate</button>
                </form>

                <!-- Delete Button -->
                <button class="delete-btn" @click="deleteCandidate">Delete Candidate</button>
              </div>
            </div>
          </div>
        </div>
        <div class="action-wrap">
          <h2 class="action-title">Manage Voters</h2>
          <div class="action">
            <div class="action-item">
              <input
                type="search"
                class="search"
                placeholder="MAT NO, Full Name"
                v-model="searchQuery"
              />
            </div>
            <div class="action-item">
              <select name="level" v-model="selectedLevel" class="custom-select">
                <option value="none">None</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
              </select>
            </div>
            <div class="action-item table">
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>MAT NO</th>
                      <th>LEVEL</th>
                      <th>VOTED</th>
                      <th>INVALID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in filteredUsers" :key="user.matno">
                      <td>{{ user.fullname }}</td>
                      <td>{{ user.matno }}</td>
                      <td>{{ user.level }}</td>
                      <td>{{ user.voted ? 'True' : 'False' }}</td>
                      <td>
                        <form><input type="checkbox" name="invalid" /></form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.greetings {
  font-family: 'Poppins', sans-serif;
  color: #222;
}
.set-timer {
  margin-top: 10px;
}
.contdown-time{
  font-weight: 600;
  font-size: clamp(1em, 2vw, 2em);
}

.styled-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.styled-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  outline: none;
}

.hidden-btn {
  visibility: hidden;
  height: 0 !important;
  padding: 0 !important;
}
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: white;
  padding: 1rem;
}
.menu-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
.brand {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

/* Offcanvas Menu Styles */
.offcanvas {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: #0e141b;
  color: white;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease;
}
.offcanvas.open {
  left: 0;
}
.close-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
}
.menu-list {
  list-style: none;
  padding: 0;
}
.menu-list li {
  margin: 1rem 0;
}
.menu-list a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
.menu-list a:hover {
  text-decoration: underline;
}

/* Main Content Styles */
.content {
  padding: 2rem;
}
.content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.action {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action.candidate-action {
  flex-direction: column;
}
.action-content {
  display: flex;
  flex-wrap: wrap;
}
.action-wrap {
  border: 1px solid #d0dbe7;
  border-radius: 8px;
  padding: 5%;
  margin-bottom: 50px;
}

.action-item {
  background-color: white;
  border: 1px solid #d0dbe7;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  min-width: 120px;
}

.action-item.img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px;
}

.action-item.img h4 {
  font-family: 'Poppins', sans-serif;
  color: #222;
}

.action-item.img .img {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.action-item.img .img img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 20px 10px;
  object-fit: cover;
}

.action-item.table {
  width: 100%;
  flex: 0 0 100%;
}

.action-title {
  padding: 5px;
  font-family: 'Poppins', sans-serif;
  color: #222;
}

.action-item h3 {
  font-family: 'Montserrat', sans-serif;
  padding: 2px;
  color: #222;
}

.action-item p {
  padding-bottom: 8px;
}
.action-item button {
  background-color: var(--blue);
  font-family: 'Poppins', sans-serif;
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.action-item button:hover {
  background-color: #146bb3;
}

.three-dot {
  position: absolute;
  top: 15px;
  right: 20px;
}

.search {
  background: #f4f4f4;
  padding: 10px 5px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  color: #222;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

td {
  font-family: 'Montserrat', sans-serif;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

td form {
  margin: 0;
}

input[type='checkbox'] {
  transform: scale(1.2);
}

/* Small screen adjustments */
@media (max-width: 768px) {
  th,
  td {
    font-size: 0.9rem;
  }
}

form.add-candidate {
  width: 100%;
  padding: 10px 0;
}

form.add-candidate .control {
  width: inherit;
  padding: 10px 0;
}

form.add-candidate .control.password {
  position: relative;
}

form.add-candidate .control input {
  width: inherit;
  border: 2px solid #ccc;
  padding: 10px 5px;
  font-family: 'Montserrat';
}

form.add-candidate .control.password i {
  position: absolute;
  right: 2%;
  top: calc(25% + 5px);
}

form.add-candidate button {
  width: 100%;
  font-family: 'Poppins';
  background: var(--blue);
  color: #fff;
  padding: 10px;
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Three dots */
.three-dot {
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: relative;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #000;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  background: red;
  color: white;
  margin-top: 10px;
  width: 100%;
}

.custom-select {
  appearance: none; /* Remove default styles */
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  background-color: #f4f4f4; /* Light gray background */
  color: #333; /* Dark text color */
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #ddd; /* Light border */
  border-radius: 8px; /* Rounded corners */
  outline: none; /* Remove focus outline */
  width: 100%; /* Full-width */
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  background: #f4f4f4
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><polygon points="0,0 10,0 5,5" style="fill:%23333;"/></svg>')
    no-repeat right 16px center;
  background-size: 12px;
}

.custom-select:hover {
  background-color: #e8e8e8; /* Slightly darker background */
  border-color: #ccc; /* Darker border on hover */
}

.custom-select:focus {
  border-color: #007bff; /* Blue border on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Subtle shadow */
}

.custom-select option {
  background-color: #fff; /* White background for options */
  color: #333; /* Dark text color for options */
}

.custom-select option:hover {
  background-color: #f0f0f0; /* Highlight hovered option */
}
</style>
