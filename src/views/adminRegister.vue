<script setup>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// const eyeSlash = document.getElementById('eyeSlash')
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
  fullname: '',
  nickname: '',
  matno: '',
  level: '',
  password: ''
})

const errorMessage = ref('')
const loading = ref(false) // Track loading state

const submitForm = async () => {
  loading.value = true // Start loading

  try {
    const response = await axios.post(
      'https://speunibenvotingapi.onrender.com/api/admin/signup',
      formData.value
    )
    console.log(response.data)
    router.push('/admin-login')
  } catch (error) {
    console.log(error)

    // Capture and display API errors
    if (error.response.status === 400) {
      errorMessage.value = error.response.data.message
      console.log(errorMessage.value)

      // Automatically clear error messages after 5 seconds
      setTimeout(() => {
        errorMessage.value = ''
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
    <img src="../img/undraw_election_day_w842.svg" alt="signup" />

    <div class="content">
      <small id="error" class="error"></small>
      <div class="title">
        <h1>Admin Registration</h1>
        <p>
          Register as an admin on the platform to manage and oversee the voting process effectively.
        </p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="control">
          <input type="email" placeholder="Email" v-model="formData.email" />
          <small v-if="errorMessage" class="error">{{ errorMessage }}</small>
        </div>

        <!-- <div class="control">
          <input type="text" placeholder="Fullname" v-model="formData.fullname" />
        </div> -->

        <div class="control">
          <input type="text" placeholder="Nickname" v-model="formData.nickname" />
        </div>

        <!-- <div class="control">
          <input type="text" placeholder="Matric number" v-model="formData.matno" />
        </div> -->

        <!-- <div class="control">
          <input type="number" placeholder="Level" v-model="formData.level" />
        </div> -->

        <div class="control password">
          <input :type="inputType" placeholder="Password" v-model="formData.password" />
          <i :class="eyeIcon" id="eyeSlash" @click="eye_slash"></i>
        </div>

        <button :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Register</span>
        </button>
        <small class="no-account"
          >Already have an account?<router-link to="/admin-login">Login</router-link></small
        >
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

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-container .content form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
