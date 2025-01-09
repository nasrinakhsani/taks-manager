<template>
  <div class="user-dashboard">
    <!-- Navbar/Header -->
    <header class="dashboard-header">
      <h1>Dashboard User</h1>
      <div class="navbar">
        <!-- Tombol Dashboard -->
        <button @click="goToDashboard">Dashboard</button>

        <!-- Tombol Tambah Tugas -->
        <button @click="goToAddTaskPage" class="nav-link">Tambah Tugas</button>

        <!-- Tombol Logout -->
        <button @click="logout">Logout</button>
      </div>
    </header>

    <!-- Statistik Tugas -->
    <section class="stats-section">
      <h2>Statistik Tugas</h2>
      <div class="stats">
        <div class="stat-card">
          <h3>Semua Tugas</h3>
          <p>{{ totalTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Tugas Belum Dikerjakan</h3>
          <p>{{ tasksNotStarted }}</p>
        </div>
        <div class="stat-card">
          <h3>Tugas Sedang Dikerjakan</h3>
          <p>{{ tasksInProgress }}</p>
        </div>
        <div class="stat-card">
          <h3>Tugas Selesai</h3>
          <p>{{ tasksCompleted }}</p>
        </div>
      </div>
    </section>

    <!-- Filter & Tugas Belum Dikerjakan, Selesai, Semua -->
    <section class="task-section">
      <div class="task-container">
        <h3>Tugas Belum Dikerjakan</h3>
        <div v-if="tasksNotStarted">
          <div
            v-for="task in tasks.filter((t) => t.status === 'Belum Dikerjakan')"
            :key="task.id"
            class="task-item"
          >
            <p>
              <strong>{{ task.title }}</strong>
            </p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Hapus</button>
          </div>
        </div>
      </div>

      <div class="task-container">
        <h3>Tugas Selesai</h3>
        <div v-if="tasksCompleted">
          <div
            v-for="task in tasks.filter((t) => t.status === 'Selesai')"
            :key="task.id"
            class="task-item"
          >
            <p>
              <strong>{{ task.title }}</strong>
            </p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Hapus</button>
          </div>
        </div>
      </div>

      <div class="task-container">
        <h3>Semua Tugas</h3>
        <div v-if="tasks.length">
          <div v-for="task in tasks" :key="task.id" class="task-item">
            <p>
              <strong>{{ task.title }}</strong>
            </p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Hapus</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      filters: {
        status: "",
        date: "",
      },
      totalTasks: 0,
      tasksNotStarted: 0,
      tasksInProgress: 0,
      tasksCompleted: 0,
      showAddTaskForm: false,
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("/api/tasks", {
          params: this.filters,
        });
        this.tasks = response.data;
        this.updateStatistics();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    updateStatistics() {
      this.totalTasks = this.tasks.length;
      this.tasksNotStarted = this.tasks.filter(
        (task) => task.status === "Belum Dikerjakan"
      ).length;
      this.tasksInProgress = this.tasks.filter(
        (task) => task.status === "Sedang Dikerjakan"
      ).length;
      this.tasksCompleted = this.tasks.filter(
        (task) => task.status === "Selesai"
      ).length;
    },

    editTask(task) {
      this.newTask = { ...task }; // Set newTask to task for editing
      this.showAddTaskForm = true; // Show form in editing mode
    },

    async deleteTask(taskId) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        this.fetchTasks(); // Refresh tasks after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    // Method to navigate back to the dashboard
    goToDashboard() {
      this.$router.push("/user"); // Ganti '/dashboard' sesuai dengan path dashboard Anda
    },

    goToAddTaskPage() {
      this.$router.push("/add"); // Programmatically navigate to the "/add" route
    },
  },
  mounted() {
    this.fetchTasks(); // Fetch tasks on mount
  },
};
</script>

<style scoped>
.user-dashboard {
  background: linear-gradient(
    135deg,
    #6a11cb,
    #2575fc
  ); /* Gradasi lebih cerah */
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 2rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.navbar button {
  background: #34d399;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  padding: 12px 25px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  margin-left: 10px;
  font-size: 1rem;
}

.navbar button:hover {
  background: #059669;
  transform: scale(1.1);
}

.stats-section {
  margin-top: 30px;
}

.stats-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.stats {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 23%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.stat-card h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.task-section {
  margin-top: 40px;
  display: flex;
  gap: 30px;
}

.task-container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  width: 32%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.task-container h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.task-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.task-item p {
  margin-bottom: 10px;
}

.task-item button {
  background: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.3s ease;
}

.task-item button:hover {
  background: #e63946;
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input,
form textarea,
form button {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ffffff;
}

form button {
  background: #34d399;
  color: #ffffff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

form button:hover {
  background: #059669;
}
</style>
