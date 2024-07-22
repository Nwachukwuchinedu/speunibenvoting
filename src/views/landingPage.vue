<script setup>
// import FeatUres from '@/components/FeatUres.vue'
import NavBar from '@/components/NavBar.vue'
// import { ref } from 'vue'

// const features = ref({
//   card1: {
//     icon: 'fa-solid fa-shield-halved fa-4x',
//     h3: 'Secured Platform',
//     p: 'With our platform, your data is secured'
//   },
//   card2: {
//     icon: 'fa-solid fa-shield-halved fa-4x',
//     h3: 'Vote Online',
//     p: 'With just few clicks, you can vote your preference candatite'
//   },
//   card3: {
//     icon: 'fa-solid fa-shield-halved fa-4x',
//     h3: 'Real Time Result',
//     p: 'View real time results and scores for each candadite'
//   }
// })
</script>

<template>
  <NavBar />
  <br /><br /><br /><br /><br />
  <br />

  <div class="container">
    <div class="content">
      <h1>Fast, Secured and Accessible Voting System</h1>
      <p>
        Let's make voting and elections easy for you. This is designed to ensure a secured voting
        session
      </p>
      <router-link to="/register" class="btn-link">Register as a Voter</router-link>
    </div>
    <img src="../img/undraw_add_user_re_5oib.svg" />
  </div>

  <!-- <i class="fa-regular fa-check-to-slot"></i> -->
  <!-- <i class="fa-solid fa-shield-halved"></i> -->
  <!-- <i class="fa-solid fa-life-ring"></i> -->
  <!-- <i class="fa-solid fa-lightbulb"></i> -->
  <!-- <i class="fa-solid fa-people-arrows"></i> -->
  <div class="feature">
    <div class="title">
      <h2>Our Features</h2>
      <p>Secure System that guarantee seamless Elections</p>
    </div>

    <!-- <div class="icon-content">
      <FeatUres :icon="features.card1.icon" :h3="features.card1.h3" :p="features.card1.p" />
      <FeatUres :icon="features.card2.icon" :h3="features.card2.h3" :p="features.card2.p" />
      <FeatUres :icon="features.card3.icon" :h3="features.card3.h3" :p="features.card3.p" />
    </div> -->

    <div class="icon-content">
      <div class="con">
        <i class="fa-solid fa-shield-halved fa-4x"></i>
        <h3>Secured Platform</h3>
        <p>With our platform, your data is secured</p>
      </div>

      <div class="con">
        <i class="fa-solid fa-check-to-slot fa-4x"></i>
        <h3>Vote Online</h3>
        <p>With just few clicks, you can vote your preference candatite</p>
      </div>

      <div class="con">
        <i class="fa-solid fa-lightbulb fa-4x"></i>
        <h3>Real Time Result</h3>
        <p>View real time results and scores for each candadite</p>
      </div>
    </div>
  </div>

  <div class="container2">
    <div class="title">
      <h2>How it works</h2>
      <p>It's simple and easy to use with these 3 steps</p>
    </div>
    <div class="content">
      <img src="../img/undraw_election_day_w842.svg" alt="election day" />

      <div class="inner">
        <div class="con">
          <h3 class="num">1</h3>
          <div class="c">
            <h3>Sign Up</h3>
            <p>Create an account on the platform to vote.</p>
          </div>
        </div>

        <div class="con">
          <h3 class="num">2</h3>
          <div class="c">
            <h3>Vote</h3>
            <p>Vote your preferred candidate.</p>
          </div>
        </div>

        <div class="con">
          <h3 class="num">3</h3>
          <div class="c">
            <h3>View Election Results</h3>
            <p>View election result of various candidate.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 10% 0;
  width: 80%;
  margin: 0 auto;
}

.container .content {
  padding-right: 20px;
}
.container h1 {
  font-family: 'Poppins';
  color: #222;
}

.container p {
  font-family: 'Montserrat';
  line-height: 2;
  padding: 10px 0;
}

.container a {
  display: inline-block;
  margin-top: 20px;
}

.container img {
  width: 80%;
  display: none;
}

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

.container2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  padding: 10%;
  width: 80%;
  background: linear-gradient(30deg, #fff, #f4f4f4);
}

.container2 .title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
}

.container2 h2 {
  font-family: 'Poppins';
}

.container2 p {
  text-align: center;
}

.container2 .content {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.container2 .content img {
  width: 80%;
  min-width: 300px;
}

.container2 .con {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 15px 0;
  margin: 40px 0;
}

.container2 .con .num {
  padding: 20px;
  border-radius: 100%;
  background: var(--blue);
  color: #fff;
  margin-right: 20px;
  font-family: 'Poppins';
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container2 .con .c {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.container2 .con .c h3 {
  font-family: 'Poppins';
}

@media (min-width: 900px) {
  .container img {
    display: block;
    min-width: 400px;
  }

  .feature .icon-content {
    grid-template-columns: repeat(3, 1fr);
  }

  .container2 .content {
    flex-direction: row ;
  }
}
</style>
