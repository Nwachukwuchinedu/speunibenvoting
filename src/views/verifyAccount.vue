<script setup>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import { onMounted, ref } from 'vue';

const loading = ref(true)
const success = ref(false)

const token =  new URLSearchParams(window.location.search).get("token")
const verifyAccount = async()=>{
   try {
     const response = await axios.get("http://localhost:5000/api/auth/verify-account", {
       params: { token }, // Attach token as query param
     })

     if(response.status === 200){
      success.value = true
     }else{
      success.value = false
     }
    console.log(response.data);
   } catch (error) {
    console.log(error);
    success.value = false
   }finally{
    loading.value = false
   }
    
}

onMounted(()=>{
    if(token){
        verifyAccount();
    }else{
    success.value = false
    loading.value = false
    }
})
</script>

<template>
  <NavBar />
  <br /><br /><br /><br /><br />
  <br />
<h1>Verify Account</h1>
</template>

<style scoped>

</style>
