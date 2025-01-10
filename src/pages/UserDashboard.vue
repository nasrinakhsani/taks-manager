<template>
  <div class="user-dashboard">
    <!-- Navbar/Header -->
    <header class="dashboard-header">
      <h1>Dashboard User</h1>
      <div class="navbar">
        <button @click="goToDashboard" class="btn-primary">Dashboard</button>
        <button @click="goToAddTaskPage" class="btn-success">Tambah Tugas</button>
        <button @click="logout" class="btn-danger">Logout</button>
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
          <h3>Tugas Selesai</h3>
          <p>{{ tasksCompleted }}</p>
        </div>
      </div>
    </section>

    <!-- Task Sections -->
    <section class="task-section">
      <div class="task-container">
        <h3>Tugas Belum Dikerjakan</h3>
        <div v-if="tasksNotStarted">
          <div v-for="task in tasksBelum" :key="task.id" class="task-item">
            <p><strong>{{ task.title }}</strong></p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <div class="task-actions">
              <button @click="editTask(task)" class="btn-edit">Edit</button>
              <button @click="deleteTask(task._id)" class="btn-delete">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <div class="task-container">
        <h3>Tugas Selesai</h3>
        <div v-if="tasksSelesai">
          <div v-for="task in tasksSelesai" :key="task.id" class="task-item">
            <p><strong>{{ task.title }}</strong></p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <div class="task-actions">
              <button @click="editTask(task)" class="btn-edit">Edit</button>
              <button @click="deleteTask(task._id)" class="btn-delete">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <div class="task-container">
        <h3>Semua Tugas</h3>
        <div v-if="tasks.length">
          <div v-for="task in tasks" :key="task.id" class="task-item">
            <p><strong>{{ task.title }}</strong></p>
            <p>{{ task.subject }}</p>
            <p>{{ formatDate(task.deadline) }}</p>
            <div class="task-actions">
              <button @click="editTask(task)" class="btn-edit">Edit</button>
              <button @click="deleteTask(task._id)" class="btn-delete">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Edit Tugas -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Edit Tugas</h3>
        <form @submit.prevent="updateTask">
          <label for="title">Judul:</label>
          <input v-model="taskToEdit.title" id="title" type="text" required />

          <label for="subject">Mata Pelajaran:</label>
          <input v-model="taskToEdit.subject" id="subject" type="text" required />

          <label for="deadline">Deadline:</label>
          <input v-model="taskToEdit.deadline" id="deadline" type="date" required />

          <label for="status">Status:</label>
          <select v-model="taskToEdit.status" id="status" required>
            <option value="belum">Belum Dikerjakan</option>
            <option value="selesai">Selesai</option>
          </select>

          <button type="submit" class="btn-success">Update</button>
          <button type="button" @click="closeModal" class="btn-secondary">Batal</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      tasksSelesai: [],
      tasksBelum: [],
      totalTasks: 0,
      tasksNotStarted: 0,
      tasksCompleted: 0,
      isModalOpen: false,
      taskToEdit: {},
    };
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks = response.data;
        this.updateStatistics();
      } catch (error) {
        console.error("Error fetching all tasks:", error);
      }
    },

    async fetchTasksNotStarted() {
      try {
        const response = await axios.get("http://localhost:3000/tasks/belum", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasksNotStarted = response.data.length;
        this.tasksBelum = response.data;
      } catch (error) {
        console.error("Error fetching tasks not started:", error);
      }
    },

    async fetchTasksCompleted() {
      try {
        const response = await axios.get("http://localhost:3000/tasks/selesai", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasksCompleted = response.data.length;
        this.tasksSelesai = response.data;
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    },

    updateStatistics() {
      this.totalTasks = this.tasks.length;
      this.fetchTasksNotStarted();
      this.fetchTasksCompleted();
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    goToDashboard() {
      this.$router.push("/user");
    },

    goToAddTaskPage() {
      this.$router.push("/add");
    },

    editTask(task) {
      this.taskToEdit = { ...task };
      if (this.taskToEdit.deadline) {
        this.taskToEdit.deadline = this.taskToEdit.deadline.split("T")[0];
      }
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.taskToEdit = {};
    },

    async updateTask() {
      try {
        await axios.put(
          `http://localhost:3000/tasks/${this.taskToEdit._id}`,
          this.taskToEdit,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.fetchTasks();
        this.closeModal();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },

    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
  },

  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.user-dashboard {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
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
  font-size: 1rem;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
  margin-left: 10px;
  color: white;
}

.navbar .btn-primary {
  background-color: #1f87ff;
}

.navbar .btn-success {
  background-color: #34d399;
}

.navbar .btn-danger {
  background-color: #ff6b6b;
}

.navbar button:hover {
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
  width: 30%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.task-section {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.task-container {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  width: 32%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.task-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.task-actions button {
  padding: 8px 16px;
  margin-right: 10px;
}

.task-actions .btn-edit {
  background-color: #34d399;
  color: white;
}

.task-actions .btn-delete {
  background-color: #ff6b6b;
  color: white;
}

.task-actions button:hover {
  transform: scale(1.05);
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input,
form select,
form button {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ffffff;
}

form button {
  background: #34d399;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

form button:hover {
  background: #059669;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #333;
}

.modal h3 {
  text-align: center;
  color: #6a11cb;
}

form button[type="button"] {
  background: #ff6b6b;
}

form button[type="button"]:hover {
  background: #e63946;
}

@media (max-width: 768px) {
  .modal {
    width: 90%;
  }
}
</style>
