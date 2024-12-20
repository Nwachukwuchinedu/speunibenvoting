<script setup>
import NavBar from '@/components/NavBar.vue'
import { getAdminData, fetchAllPositions, sendVerificationEmailFunc } from '@/axios/user'
import { onMounted, ref, computed, watch } from 'vue'


const userData = ref(null)
const positions = ref([])

onMounted(async () => {
//   try {
//     const user = await getAdminData()
//     userData.value = user
//     console.log(userData.value)

//     const hasVoted = await checkIfUserHasVoted(userData.value.matno)
//     hasVotedData.value = hasVoted

//     console.log(hasVotedData.value)
//     console.log(userData.value)
//   } catch (error) {
//     console.error(error)
//     router.push('/admin-login')
//   } finally {
//     isLoading.value = false
//   }
})

// Method to capitalize the first letter
const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

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
    console.log('Updated positions:', newVal)
  },
  { deep: true }
)


const sendVerificationEmail = async()=>{
  try{
    const userData = await getAdminData()
    await sendVerificationEmailFunc(userData?.email)
  }catch(err){
    console.log(err);
  }
}

</script>

<template>
  <NavBar />
  <br /><br /><br /><br /><br />
  <br />
  <div v-if="userData && !userData.verified" class="container">
    <div class="welcome">
      <h1 v-if="userData && userData.email" class="welcome-text">
        Hello, {{ capitalizeFirstLetter(userData.email.split('@')[0].split('.')[0]) }}!
      </h1>
      <p>
        You have not verified your email address. Please verify your email address before casting
        your vote.
      </p>
      <button class="verify" @click="sendVerificationEmail()">Send Verification Email</button>
    </div>
  </div>
  <div v-else class="container">
    <div class="welcome">
      <h1 v-if="userData && userData.email" class="welcome-text">
        Hello, {{ capitalizeFirstLetter(userData.email.split('@')[0].split('.')[0]) }}!
      </h1>
      <p>
        Cast your vote for your preferred candidates. Be part of the decision-making process. The
        election countdown is displayed below. Ensure you vote before the time runs out!
      </p>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  padding: 0 0 40px 0;
}
.welcome-text {
  font-family: 'Poppins';
  color: #222;
  margin-bottom: 20px;
}
.container {
  padding: 10%;
  display: flex;
  flex-direction: column;
}
.verify {
  background-color: var(--blue);
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.end {
  padding: 10% 0;
}

.end h2 {
  font-family: 'Poppins';
  color: #222;
  padding: 10px 0;
  margin-bottom: 10px;
}

.time-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  flex-wrap: wrap;
}

.time-container .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.time-container .card .time {
  width: 200px;
  height: 100px;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins';
  font-size: 40px;
  margin: 10px;
}

.time-container .card .text {
  font-family: 'Montserrat';
}

@media (max-width: 600px) {
  .time-container .card .time {
    width: 100px;
  }
}

.candidates h1 {
  font-family: 'Poppins';
  color: #222;
  padding: 10px 0;
  margin-bottom: 10px;
}

.candidates button {
  background: var(--blue);
  color: #fff;
  padding: 10px;
  font-family: 'Poppins';
  border: none;
  cursor: pointer;
  margin: 15px 0;
}

.candidates .card {
  background: linear-gradient(#fffefe, #fffbfb);
  box-shadow: var(--sdw-2);
  padding: 20px;
  margin: 10px 0 100px 0;
}

.candidates .card .title {
  font-family: 'Poppins';
  color: #222;
  padding: 10px 0;
}

.candidates .card .inner {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
  justify-content: space-between; /* Distribute space evenly between items */
  align-items: center; /* Center items vertically */
  gap: 20px; /* Optional: space between items if you want more control */
  padding: 10px 0;
  width: 100%; /* Ensure the inner container takes up full width */
  box-sizing: border-box; /* Include padding in the width calculation */
}

.candidates .card .inner > * {
  flex: 1 1 auto; /* Allow items to grow and shrink */
  min-width: 200px; /* Prevent items from becoming too small */
  text-align: center; /* Center text inside each item */
}

.candidates .card .inner div {
  padding: 10px;
  font-family: 'Montserrat';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.07);
}

.candidates .card .inner div input {
  background: var(--blue);
  color: #fff;
  padding: 10px;
  font-family: 'Poppins';
  border: none;
  cursor: pointer;
  margin: 15px 0;
}

.candidates img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px 10px;
  object-fit: cover;
}

.hidden-radio {
  display: none;
}

.candidates button.vote-button {
  background-color: blue;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.candidates button.voted-button {
  background-color: green;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
}

.candidates button.disabled-button {
  background-color: rgb(212, 211, 211);
  color: white;
  cursor: not-allowed;
}

.welcome {
  animation: fadeIn 0.8s ease-in;
}

/* Pulse animation for countdown cards */
.time-container .card .time {
  transition: transform 0.3s ease;
}

.time-container .card .time:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Candidate cards hover effect */
.candidates .card {
  transition: all 0.3s ease;
}

.candidates .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Candidate images zoom effect */
.candidates img {
  transition: transform 0.3s ease;
}

.candidates img:hover {
  transform: scale(1.1);
}

/* Vote button animation */
.candidates button {
  transition: all 0.3s ease;
}

.candidates button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Checkbox custom animation */
.candidates .card .inner div input {
  transition: all 0.2s ease;
}

.candidates .card .inner div input:checked {
  transform: scale(1.2);
}

/* Keyframes for fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add stagger effect for candidate cards */
.candidates .list .card {
  animation: slideIn 0.6s ease-out;
  animation-fill-mode: both;
}

.candidates .list .card:nth-child(1) {
  animation-delay: 0.1s;
}
.candidates .list .card:nth-child(2) {
  animation-delay: 0.2s;
}
.candidates .list .card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
