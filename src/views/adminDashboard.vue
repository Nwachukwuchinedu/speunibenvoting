<script setup>
// import NavBar from '@/components/NavBar.vue'
import { getAdminData, fetchAllPositions, fetchAllUsers } from '@/axios/user'
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userData = ref(null)
const positions = ref([])
const allUsersData = ref([])
const backedndURI = 'http://localhost:5000'
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
      <h2>Welcome, Admin John!</h2>
      <div class="actions">
        <div class="action-wrap">
          <h2 class="action-title">Timer</h2>
          <div class="action">
            <div class="action-item">
              <h3>Start/End Election</h3>
              <p>Start the election or end the election</p>
              <button>Start Election</button>
            </div>
            <div class="action-item">
              <h3>Countdown Timer Settings</h3>
              <p>Set the countdown timer for the election</p>
              <button>Open</button>
            </div>
          </div>
        </div>
        <div class="action-wrap">
          <h2 class="action-title">Upload Candidates</h2>
          <div class="action">
            <div class="action-item">
              <h3>Upload Data and Results</h3>
              <p>Upload voter data, candidate data, and election results</p>
              <button>Upload Now</button>
            </div>
          </div>
        </div>
        <div class="action-wrap">
          <h2 class="action-title">Manage Candidates</h2>

          <div class="action candidate-action">
            <div v-for="position in positions" :key="position.id" class="action-content">
              <div
                v-for="candidate in position.candidates"
                :key="candidate.id"
                class="action-item img"
              >
                <div class="three-dot">:</div>
                <div class="img">
                  <img :src="`${backedndURI}/${candidate.picture}`" :alt="candidate.name" />
                </div>
                <h4>{{ candidate.name }}</h4>
                <p>{{ position.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="action-wrap">
          <h2 class="action-title">Manage Voters</h2>
          <div class="action">
            <div class="action-item">
              <input type="search" class="search" placeholder="MAT NO" />
            </div>
            <div class="action-item">
              <select name="level">
                <option value="none">None</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
              </select>
            </div>
            <div class="action-item">
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>MAT NO</th>
                      <th>LEVEL</th>
                      <th>VOTED</th>
                      <th>INVALID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in allUsersData" :key="user.matno">
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
/* Global Styles */
body {
  font-family: 'Public Sans', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #0e141b;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1980e6;
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
  min-width: 250px;
}

.action-item.img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px;
}

.action-item.img .img {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.action-item.img .img img {
  height: 100%;
  width: 100%;
  object-position: center;
}

.action-title {
  padding: 5px;
}
.action-item h3 {
  margin-top: 0;
}
.action-item button {
  background-color: #1980e6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
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
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
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
</style>
