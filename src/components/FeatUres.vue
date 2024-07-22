<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  h3: {
    type: String,
    required: true
  },
  p: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="con">
    <i :class="{ ico: icon }"></i>
    <h3>{{ h3 }}</h3>
    <p>{{ p }}</p>
  </div>
</template>

<style >
.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(var(--blue), var(--d-blue));
}

.feature .title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature h2 {
  font-family: 'Poppins';
  color: #fff;
}

.feature p {
  color: #fff;
  font-family: 'Montserrat';
  line-height: 2;
  font-size: 15px;
}

.feature .icon-content {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
}

.feature .con {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature i {
  color: #fff;
}

.feature h3 {
  font-family: 'Montserrat';
  color: #fff;
  padding: 10px 0;
}

.feature p {
  text-align: center;
}
</style>

