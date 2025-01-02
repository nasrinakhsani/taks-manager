<template>
  <div class="user-dashboard">
    <header class="dashboard-header">
      <h1>Daftar Tugas</h1>
      <button @click="logout">Logout</button>
    </header>

    <section class="tasks-section">
      <h2>Tugas Anda</h2>
      <div class="filters">
        <label for="status">Filter Status:</label>
        <select v-model="filters.status" @change="fetchTasks">
          <option value="">Semua</option>
          <option value="Belum Dikerjakan">Belum Dikerjakan</option>
          <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
          <option value="Selesai">Selesai</option>
        </select>

        <label for="date">Filter Tanggal:</label>
        <input type="date" v-model="filters.date" @change="fetchTasks" />
      </div>

      <ul class="tasks-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <h3>{{ task.title }}</h3>
          <p>Status: {{ task.status }}</p>
          <p>Deadline: {{ formatDate(task.deadline) }}</p>
          <p>{{ task.description }}</p>
          <button
            @click="updateTaskStatus(task.id, 'Sedang Dikerjakan')"
            v-if="task.status === 'Belum Dikerjakan'"
          >
            Mulai Kerjakan
          </button>
          <button
            @click="updateTaskStatus(task.id, 'Selesai')"
            v-if="task.status === 'Sedang Dikerjakan'"
          >
            Tandai Selesai
          </button>
        </li>
      </ul>
    </section>

    <section class="add-task-section">
      <h2>Request Tugas Baru</h2>
      <form @submit.prevent="requestTask">
        <div>
          <label for="title">Judul:</label>
          <input type="text" v-model="newTask.title" required />
        </div>

        <div>
          <label for="description">Deskripsi:</label>
          <textarea v-model="newTask.description" required></textarea>
        </div>

        <div>
          <label for="deadline">Deadline:</label>
          <input type="date" v-model="newTask.deadline" required />
        </div>

        <button type="submit">Kirim Request</button>
      </form>
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
      newTask: {
        title: "",
        description: "",
        deadline: "",
      },
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("/api/tasks", {
          params: this.filters,
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async updateTaskStatus(taskId, status) {
      try {
        await axios.patch(`/api/tasks/${taskId}`, { status });
        this.fetchTasks();
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    async requestTask() {
      try {
        await axios.post("/api/tasks/request", this.newTask);
        this.newTask = { title: "", description: "", deadline: "" };
        alert("Request tugas berhasil dikirim!");
      } catch (error) {
        console.error("Error requesting task:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.user-dashboard {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-header h1 {
  font-size: 2rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.dashboard-header button {
  background: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dashboard-header button:hover {
  background: #e63946;
}

.tasks-section,
.add-task-section {
  background: #1e40af;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.tasks-section h2,
.add-task-section h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.filters label {
  margin-right: 10px;
}

.filters select,
.filters input {
  background: #1e293b;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.tasks-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: #1e40af;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #4fc3f7,
    0 0 30px #4fc3f7;
}

.task-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.task-item button {
  background: #34d399;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
}

.task-item button:hover {
  background: #059669;
  transform: scale(1.1);
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input,
form textarea,
form button {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ffffff;
}

form button {
  background: #34d399;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

form button:hover {
  background: #059669;
}
</style>
