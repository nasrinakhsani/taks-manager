<template>
  <div class="user-tasks">
    <h2>Your Tasks</h2>
    <!-- Task Table -->
    <div class="task-table-container">
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>
              <span :class="getStatusClass(task.status)" class="status-cell">
                <i :class="getStatusIcon(task.status)"></i> {{ task.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.fetchUserTasks();
  },
  methods: {
    async fetchUserTasks() {
      try {
        const response = await axios.get("http://localhost:8000/user-tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Failed to fetch user tasks", error);
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
    getStatusIcon(status) {
      switch (status) {
        case "Pending":
          return "fas fa-hourglass-half";
        case "In Progress":
          return "fas fa-spinner fa-spin";
        case "Completed":
          return "fas fa-check-circle";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
/* Styling for User Tasks Page */
.user-tasks {
  padding: 40px;
  font-family: "Poppins", sans-serif;
  background-color: #f0f4f8;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Change this to 'flex-start' */
}

h2 {
  font-size: 36px;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.task-table-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 900px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
}

table th,
table td {
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

table td {
  color: #555;
  font-size: 16px;
}

.status-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Status Colors */
.status-pending {
  color: #ff9800;
  font-weight: bold;
}

.status-progress {
  color: #03a9f4;
  font-weight: bold;
}

.status-completed {
  color: #4caf50;
  font-weight: bold;
}

/* Icons */
.status-pending i {
  color: #ff9800;
}

.status-progress i {
  color: #03a9f4;
}

.status-completed i {
  color: #4caf50;
}

/* Hover Effects */
tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transition: background-color 0.3s;
}
</style>
