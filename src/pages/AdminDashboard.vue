<template>
  <div class="admin-dashboard">
    <!-- Navbar -->
    <header class="navbar">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/tasks" class="nav-link">Tasks</router-link></li>
          <li><a @click.prevent="logout" class="nav-link">Logout</a></li>
        </ul>
      </nav>
    </header>

    <!-- Statistik Cards -->
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

    <!-- User Tasks -->
    <section class="user-tasks">
      <h2>User Tasks</h2>
      <div class="task-table-container">
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>
                <span :class="getStatusClass(task.status)">{{
                  task.status
                }}</span>
              </td>
              <td>
                <button @click="changeTaskStatus(task.id)" class="action-btn">
                  Change Status
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
      tasks: [],
    };
  },
  created() {
    this.fetchStats();
    this.fetchTasks();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get("http://localhost:8000/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.stats = response.data;
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:8000/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Failed to fetch tasks", error);
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
        this.fetchTasks(); // Refresh tasks
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

.navbar h1 {
  font-size: 26px;
  text-shadow: 0 0 8px #ffffff, 0 0 10px #00ffff;
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

/* Stats Section */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #006699, #00b3cc);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
}

.stat-header h3 {
  font-size: 22px;
  margin: 0;
}

.stat-value {
  font-size: 38px;
  font-weight: bold;
  text-shadow: 0 0 12px #00ffff, 0 0 20px #00ffff;
}

/* User Tasks Section */
.user-tasks {
  text-align: center;
  padding: 20px;
}

.user-tasks h2 {
  font-size: 34px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;
  color: #333;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
}

/* Tasks Table */
.task-table-container {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #e6f7ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th {
  background: #006699;
  color: white;
  text-align: left;
  padding: 18px;
}

table td {
  padding: 15px;
  text-align: left;
}

button.action-btn {
  background: #00bcd4;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: transform 0.3s ease, background 0.3s ease;
}

button.action-btn:hover {
  background: #008394;
  transform: scale(1.05);
}

.status-pending {
  color: #ff9800;
  text-shadow: 0 0 6px #ff9800;
}

.status-progress {
  color: #2196f3;
  text-shadow: 0 0 6px #2196f3;
}

.status-completed {
  color: #4caf50;
  text-shadow: 0 0 6px #4caf50;
}
</style>
