<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2 class="title">Sign Up</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="name"
            id="name"
            required
            placeholder="Enter your name"
          />
        </div>
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

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" class="submit-btn">Sign Up</button>
        <p class="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserSignup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    passwordsMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    async submitForm() {
      if (this.passwordsMatch) {
        try {
          const response = await axios.post("http://localhost:8000/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
          });

          if (response.data.success) {
            alert("Signup successful! Please login.");
            this.$router.push("/login");
          } else {
            alert("Signup failed! Please check your inputs.");
          }
        } catch (error) {
          alert("Signup failed! Please check your inputs.");
        }
      } else {
        alert("Passwords do not match!");
        this.confirmPassword = "";
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the signup page */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  background: linear-gradient(135deg, #87ceeb, #4682b4); /* Gradien biru */
}

.signup-form {
  background: rgba(255, 255, 255, 0.9); /* Transparansi ringan */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(10px); /* Blur effect */
  position: relative;
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
  box-shadow: 0 0 8px rgba(70, 130, 180, 0.6); /* Biru tua */
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
  background: linear-gradient(
    135deg,
    #1e90ff,
    #4682b4
  ); /* Gradien lebih terang */
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.submit-btn:active {
  transform: translateY(2px);
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #4682b4; /* Biru tua */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #1e90ff; /* Biru terang */
  text-decoration: underline;
}
</style>
