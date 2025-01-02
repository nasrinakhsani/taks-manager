<template>
  <header class="navbar">
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li>
          <router-link to="/login" @click.native="logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    // Method to handle logout
    logout() {
      localStorage.removeItem("token"); // Remove token from local storage
      this.$router.push("/login"); // Redirect to login page
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0044cc;
  padding: 15px 30px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar h1 {
  font-size: 24px;
}

.navbar nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar nav ul li {
  display: inline-block;
}

.navbar nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.navbar nav ul li a:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
