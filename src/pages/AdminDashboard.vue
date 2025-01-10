<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-left">
        <h1>Admin Dashboard</h1>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/admin" class="nav-link">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/user-management" class="nav-link"
              >User Management</router-link
            >
          </li>
          <li><a @click.prevent="logout" class="nav-link">Logout</a></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content Section -->
    <div class="main-content">
      <!-- Statistik Section -->
      <section class="stats">
        <div class="stat-card" v-for="(stat, index) in stats" :key="index">
          <div class="stat-header">
            <h3>{{ stat.title }}</h3>
            <div class="stat-value">{{ stat.value }}</div>
          </div>
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
        </div>
      </section>

      <!-- User Status Table -->
      <section class="user-status">
        <h2>User</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user._id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stats: [
        { title: "Total Users", value: 0, icon: "fas fa-users" },
        { title: "Pending Tasks", value: 0, icon: "fas fa-tasks" },
        { title: "Completed Tasks", value: 0, icon: "fas fa-check-circle" },
      ],
      tasks: [], // Tidak lagi mengelompokkan tugas
      users: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchTasks();
    this.fetchUsers();
  },
  methods: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        // Mengambil data tugas dengan status 'Pending'
        const pendingResponse = await axios.get("http://localhost:3000/tasks/belum", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        this.tasks = pendingResponse.data;

        // Menghitung jumlah tugas dengan status 'Pending' dan mengupdate statistik
        const pendingTasksCount = this.tasks.length;
        this.stats[1].value = pendingTasksCount; // Update "Pending Tasks" di statistik

        // Mengambil data tugas dengan status 'Completed'
        const completedResponse = await axios.get("http://localhost:3000/tasks/selesai", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Menghitung jumlah tugas dengan status 'Completed' dan mengupdate statistik
        const completedTasksCount = completedResponse.data.length;
        this.stats[2].value = completedTasksCount; // Update "Completed Tasks" di statistik

      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = response.data;
        // Mengupdate total users
        this.stats[0].value = this.users.length;
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    },
    async changeTaskStatus(taskId) {
      try {
        await axios.patch(
          `http://localhost:8000/tasks/${taskId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.fetchTasks(); // Refresh tasks setelah status diubah
      } catch (error) {
        console.error("Failed to change task status", error);
      }
    },
    getStatusClass(status) {
      switch (status) {
        case "Pending":
          return "status-pending";
        case "In Progress":
          return "status-progress";
        case "Completed":
          return "status-completed";
        default:
          return "";
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};

</script>

<style scoped>
/* Global Styles */
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background-color: #f4f6fc;
  display: flex;
  height: 100vh;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #007bb5, #00aaff);
  padding: 15px 30px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar-left h1 {
  font-size: 26px;
  font-weight: bold;
  margin: 0;
}

.navbar nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar nav ul li {
  display: inline-block;
}

.navbar nav ul li a,
.navbar nav ul li .nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 14px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.navbar nav ul li a:hover,
.navbar nav ul li .nav-link:hover {
  background: rgba(0, 255, 255, 0.2);
}

/* Main Content */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f6fc;
  padding: 30px;
}

/* Statistik Cards */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.stat-card {
  background: #006699;
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-header h3 {
  font-size: 18px;
  margin: 0;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

/* User Status Table */
.user-status {
  margin-top: 30px;
}

.user-status h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background: #007bb5;
  color: white;
  text-align: left;
  padding: 10px;
}

table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.online {
  color: #4caf50;
  font-weight: bold;
}

.offline {
  color: #f44336;
  font-weight: bold;
}

/* Tasks Containers */
.tasks-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.task-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.task-table-container {
  overflow-x: auto;
}

button.action-btn {
  background: #007bb5;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
}

.loading {
  color: #007bb5;
}

/* Status Classes */
.status-pending {
  color: #ff9800;
}

.status-progress {
  color: #4caf50;
}

.status-completed {
  color: #2196f3;
}
</style>
