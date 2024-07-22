<script>
// For the hamburger menu for small screen
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    // return true if false when clicked
    // return false if true when clicked
    toggleClass() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<template>
  <nav class="navbar" :class="{ active: isActive }">
    <img class="logo l" src="../img/spelogo.jpeg" alt="logo" />
    <div class="menu" id="mainMenu">
      <img class="logo s" src="../img/spelogo.jpeg" alt="logo" />
      <h2>SPE UNIBEN</h2>
      <i class="fa-solid fa-bars fa-2x" @click="toggleClass"></i>
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">LogIn</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar.active {
  height: auto;
}

.navbar.active ul {
  transform: translateY(-10px);
  opacity: 1;
  visibility: visible;
}

.navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 0;
}

.navbar ul {
  background: #fff;
  padding: 10px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  box-shadow: var(--sdw-1);
  transition: all 0.2s ease-in-out;
}

.navbar ul li {
  padding: 10px 12px;
}

.navbar ul li a {
  color: var(--w-grey);
  font-family: 'Montserrat';
  font-size: clamp(14px, 2vw, 16px);
}

.menu {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 10%;
  box-shadow: var(--sdw-1);
}

.logo {
  width: 40px;
  height: 40px;
  display: block;
}

.logo.l {
  display: none;
}

.menu .fa-solid {
  cursor: pointer;
  font-size: clamp(25px, 4vw, 32px);
}

.menu h2 {
  font-family: 'Poppins';
  font-size: clamp(20px, 2vw, 24px);
}

@media (min-width: 768px) {
  .navbar.active ul {
    transform: translateY(0);
  }
  .navbar {
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    height: auto;
    box-shadow: var(--sdw-1);
  }

  .navbar .menu {
    background: transparent;
    box-shadow: none;
  }

  .navbar .menu .fa-solid {
    display: none;
  }

  .navbar .menu a {
    display: none;
  }

  .navbar ul {
    flex-direction: row;
    margin-top: 0;
    padding: 0;
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    transition: none;
    box-shadow: none;
  }

  .logo.s {
    display: none;
  }

  .logo.l {
    display: block;
  }
}
</style>
