<script setup>
import NavBar from '@/components/NavBar.vue'
import { getUserData } from '@/auth/user'
import {  onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = ref(null)

onMounted(async () => {
  try {
    const user = await getUserData()
    userData.value = user
    console.log(userData.value)
  } catch (error) {
    console.log(error)
    router.push('/login')
  }
})

// Method to capitalize the first letter
const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
</script>

<template>
  <NavBar />
  <br /><br /><br /><br /><br />
  <br />

  <div class="container">
    <div class="welcome">
      <h1 v-if="userData && userData.email" class="welcome-text">
        Hello, {{ capitalizeFirstLetter(userData.email.split('@')[0].split('.')[0]) }}!
      </h1>
      <p>
        Cast your vote for your preferred candidates. Be part of the decision-making process. The
        election countdown is displayed below. Ensure you vote before the time runs out!
      </p>
    </div>

    <div class="end">
      <h2>Election Ends in:</h2>
      <div class="time-container">
        <div class="card">
          <div class="time">01</div>
          <p class="text">Days</p>
        </div>
        <div class="card">
          <div class="time">12</div>
          <p class="text">Hours</p>
        </div>
        <div class="card">
          <div class="time">01</div>
          <p class="text">Minutes</p>
        </div>
        <div class="card">
          <div class="time">40</div>
          <p class="text">Seconds</p>
        </div>
      </div>
    </div>

    <div class="candidates">
      <h1>Candidates</h1>
      <div class="list">
        <div class="card">
          <h2 class="title">President</h2>
          <div class="inner">
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="title">Vice President</h2>
          <div class="inner">
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="title">Treasurer</h2>
          <div class="inner">
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
            <div>
              <img src="../img/spelogo.jpeg" alt="" />
              <h3>John Doe</h3>
              <button>Vote</button>
            </div>
          </div>
        </div>
      </div>
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
}

.candidates .card .inner div button {
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
</style>
