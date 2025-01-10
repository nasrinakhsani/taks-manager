<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="title">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="submit-btn">Login</button>
        <p class="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Menghapus token yang ada di localStorage jika ada
        localStorage.removeItem("token");

        // Mengirimkan permintaan login ke API
        const response = await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        });

        // Mengecek apakah respons mengandung token
        if (response.data.token) {
          // Menyimpan token baru ke localStorage
          localStorage.setItem("token", response.data.token);

          // Mengecek role pengguna dan melakukan redirect berdasarkan role
          if (response.data.role === "admin") {
            this.$router.push("/Admin"); // Redirect ke halaman Admin jika role admin
          } else if (response.data.role === "user") {
            this.$router.push("/User"); // Redirect ke halaman User jika role user
          } else {
            alert("Unknown role! Please contact the administrator.");
          }
        } else {
          alert("Login failed! Please check your credentials.");
        }
      } catch (error) {
        alert("Login failed! Please check your credentials.");
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the login page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  background: linear-gradient(135deg, #87ceeb, #4682b4); /* Gradasi biru cerah ke biru tua */
}

.login-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(10px);
  z-index: 1;
}

.title {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #f9f9f9;
}

.form-group input:focus {
  border-color: #4682b4; /* Biru tua */
  outline: none;
  box-shadow: 0 0 8px rgba(70, 130, 180, 0.6);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4682b4, #1e90ff); /* Gradien biru */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #1e90ff, #4682b4);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.submit-btn:active {
  transform: translateY(2px);
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #4682b4; /* Biru tua */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #1e90ff; /* Biru lebih terang */
  text-decoration: underline;
}
</style>
