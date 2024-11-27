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

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData.value)
    const token = response.data.token
    localStorage.setItem('token', token)
    router.push('/dashboard')
  } catch (error) {
    console.log(`Errro: ${error}`)
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
          <input type="email" placeholder="School email" v-model="formData.email" />
        </div>

        <div class="control password">
          <input :type="inputType" placeholder="Password" v-model="formData.password" />
          <i :class="eyeIcon" id="eyeSlash" @click="eye_slash"></i>
        </div>

        <button>Log In</button>
        <small class="no-account"
          >Don't have an account?<router-link to="/register">SignUp</router-link></small
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
  font-family: 'Montserrat';
  padding: 10px;
  background: #fff;
  display: inline-block;
  box-shadow: var(--sdw-1);
  width: 100%;
  border-bottom: 1px solid red;
  transform: translateY(-10px);
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s linear;
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
