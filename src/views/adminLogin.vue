<script setup>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const eyeIcon = ref('fa-solid fa-eye-slash')
const inputType = ref('password')

//eye open and close in password
const eye_slash = () => {
  console.log('ok')
  if (eyeIcon.value === 'fa-solid fa-eye-slash') {
    eyeIcon.value = 'fa-solid fa-eye'
    inputType.value = 'text'
  } else if (eyeIcon.value === 'fa-solid fa-eye') {
    eyeIcon.value = 'fa-solid fa-eye-slash'
    inputType.value = 'password'
  }
}

const formData = ref({
  email: '',
  password: ''
})

const errorMessage = ref({})
const loading = ref(false) // Track loading state

const submitForm = async () => {
  loading.value = true // Start loading
  try {
    const response = await axios.post(
      'https://speunibenvotingapi.onrender.com/api/admin/login',
      formData.value
    )
    const token = response.data.token
    localStorage.setItem('admin-token', token)
    router.push('/admin-dashboard')
  } catch (error) {
    // Capture and display API errors
    if (error.response && error.response.status === 401) {
      errorMessage.value = error.response.data

      // Automatically clear error messages after 5 seconds
      setTimeout(() => {
        errorMessage.value = {}
      }, 5000)
    } else {
      console.error(`Unexpected Error: ${error.message}`)
    }
  } finally {
    loading.value = false // Stop loading
  }
}
</script>

<template>
  <NavBar />
  <br /><br /><br /><br /><br />
  <br />

  <div class="form-container">
    <img src="../img/undraw_election_day_w842.svg" alt="login" />

    <div class="content">
      <small id="error" class="error"></small>
      <div class="title">
        <h1>Welcome!</h1>
        <p>Register as a voter on the voting platform to vote in your preferred candidate.</p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="control">
          <input type="email" placeholder="Email" v-model="formData.email" />
          <small v-if="errorMessage.email" class="error">{{ errorMessage.email }}</small>
        </div>

        <div class="control password">
          <input :type="inputType" placeholder="Password" v-model="formData.password" />
          <i :class="eyeIcon" id="eyeSlash" @click="eye_slash"></i>
          <small v-if="errorMessage.password" class="error">{{ errorMessage.password }}</small>
        </div>

        <button :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Log In</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  padding: 10%;
  display: flex;
}

.form-container img {
  width: 80%;
  min-width: 300px;
  max-width: 500px;
  display: none;
}

.form-container .content {
  padding: 0 20px;
}

.form-container .content small.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  font-family: 'Montserrat';
}

.form-container .content .title h1 {
  font-family: 'Poppins';
}

.form-container .content form {
  width: 100%;
  padding: 10px 0;
}

.form-container .content form .control {
  width: inherit;
  padding: 10px 0;
}

.form-container .content form .control.password {
  position: relative;
}

.form-container .content form .control input {
  width: inherit;
  border: 2px solid var(--blue);
  padding: 10px 5px;
  font-family: 'Montserrat';
}

.form-container .content form .control.password i {
  position: absolute;
  right: 2%;
  top: calc(25% + 5px);
}

.form-container .content form button {
  width: 100%;
  font-family: 'Poppins';
  background: var(--blue);
  color: #fff;
  padding: 10px;
}

.form-container img {
  width: 80%;
  min-width: 300px;
  max-width: 500px;
  display: none;
}

small.no-account {
  color: var(--w-grey);
  display: block;
  font-family: 'Montserrat';
  margin-top: 10px;
  text-align: right;
}

small.no-account a {
  text-decoration: underline;
  color: var(--blue);
}
@media (min-width: 900px) {
  .form-container img {
    min-width: 400px;
    display: block;
  }
}
</style>
