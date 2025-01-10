<template>
  <div class="add-task-page">
    <h2>Tambah Tugas</h2>
    <form @submit.prevent="requestTask">
      <div class="form-group">
        <label for="title">Judul:</label>
        <input type="text" v-model="newTask.title" required />
      </div>
      <div class="form-group">
        <label for="subject">Mata Pelajaran:</label>
        <input type="text" v-model="newTask.subject" required />
      </div>
      <div class="form-group">
        <label for="description">Deskripsi:</label>
        <textarea v-model="newTask.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="deadline">Deadline:</label>
        <input type="date" v-model="newTask.deadline" required />
      </div>
      <div class="form-actions">
        <button type="submit">Tambah Tugas</button>
        <button type="button" @click="goToDashboard" class="secondary-btn">Kembali ke Dashboard</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTask: {
        title: "",
        subject: "",
        description: "",
        deadline: "",
      },
    };
  },
  methods: {
    async requestTask() {
      try {
        // Mengirim data tugas baru ke API
        await axios.post("http://localhost:3000/tasks", this.newTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Jika perlu token untuk autentikasi
          },
        });

        // Reset form setelah tugas berhasil ditambahkan
        this.newTask = {
          title: "",
          subject: "",
          description: "",
          deadline: "",
        };

        alert("Tugas berhasil ditambahkan!");

        // Arahkan pengguna ke dashboard setelah tugas ditambahkan
        this.$router.push("/user"); // Halaman Dashboard Pengguna
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    },

    goToDashboard() {
      this.$router.push("/user"); // Navigasi ke halaman Dashboard
    },
  },
};
</script>

<style scoped>
/* Gaya untuk Halaman Add Task */
.add-task-page {
  background: linear-gradient(135deg, #00b0ff, #1e3c72); /* Gradasi biru */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 40px auto;
  color: white; /* Agar teks kontras dengan latar belakang biru */
}

.add-task-page h2 {
  font-size: 1.8rem;
  color: white;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #f0f0f0; /* Memberikan latar belakang input yang terang agar mudah dibaca */
}

.form-group textarea {
  height: 150px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

button {
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.secondary-btn {
  background-color: #f0ad4e;
  color: white;
}

.secondary-btn:hover {
  background-color: #ec971f;
}

/* Responsivitas */
@media (max-width: 600px) {
  .add-task-page {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }

  .secondary-btn {
    background-color: #d9534f;
  }
}
</style>
