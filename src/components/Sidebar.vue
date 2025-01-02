<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/admin">Admin Dashboard</router-link></li>
        <li><router-link to="/logout">Logout</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2f3b52;
  padding: 20px;
  color: white;
  position: fixed;
  height: 100%;
  top: 0;
}

.sidebar nav ul {
  list-style: none;
}

.sidebar nav ul li {
  margin: 20px 0;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  display: block;
  transition: background-color 0.3s ease;
}

.sidebar nav ul li a:hover {
  background-color: #3d4d66;
}
</style>
