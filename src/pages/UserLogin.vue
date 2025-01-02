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
        const response = await axios.post("http://localhost:8000/login", {
          email: this.email,
          password: this.password,
        });
        // Menyimpan token di LocalStorage atau Vuex
        localStorage.setItem("token", response.data.access_token);
        this.$router.push("/admin-dashboard"); // Pindah ke Dashboard Admin setelah login berhasil
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
  position: relative;
  background: url("../assets/Sukses.jpg") no-repeat center center/cover; /* Replace with your image URL */
  background-size: cover; /* Make sure the image covers the entire container */
}

/* Black Hole Rotating Effect yang lebih menarik dan futuristik */
.login-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle,
    rgba(0, 130, 139, 0.8),
    rgba(33, 33, 33, 0.9),
    rgb(171, 229, 236)
  );
  background-size: 200% 200%;
  animation: blackHoleRotation 6s infinite linear,
    pulseEffect 6s infinite ease-in-out;
  z-index: 0;
  opacity: 0.8;
  filter: blur(8px);
  transition: opacity 5s ease-in-out;
}

/* Animasi Rotasi Black Hole */
@keyframes blackHoleRotation {
  0% {
    transform: rotate(0deg);
    background-position: 0% 0%;
  }
  50% {
    transform: rotate(180deg);
    background-position: 100% 100%;
  }
  100% {
    transform: rotate(360deg);
    background-position: 0% 0%;
  }
}

/* Efek Pulsasi untuk Memberikan Dinamika */
@keyframes pulseEffect {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.login-form {
  background: rgba(255, 255, 255, 0.9); /* Slight transparency */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(10px); /* Blur effect */
  position: relative;
  z-index: 1; /* To keep the form above the rotating background */
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
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.6);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #2980b9;
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
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}
</style>
