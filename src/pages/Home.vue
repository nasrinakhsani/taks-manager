<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="overlay"></div>
      <!-- Overlay to make text stand out -->
      <div class="hero-content">
        <h1>Welcome to Task Manager</h1>
        <p>Organize your tasks and boost your productivity</p>
        <button class="cta-btn" @click="navigateToLogin">Get Started</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    navigateToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Home Page Styling */
.home-container {
  font-family: "Roboto", sans-serif;
}

/* Hero Section */
.hero-section {
  background: url("../assets/ayam.jpg") no-repeat center center; /* Replace with your image URL */
  background-size: cover; /* Ensure the image covers the entire section */
  background-attachment: fixed; /* Optional: Keeps the background fixed when scrolling */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

/* Overlay to make text stand out */
.hero-section .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4); /* Darker overlay */
  z-index: 1;
}

.hero-content {
  z-index: 2;
  position: relative;
  max-width: 800px;
  padding: 20px;
  animation: fadeInUp 1.5s ease-out; /* Add fade-in animation */
}

/* Heading and Paragraph Styling */
.hero-section h1 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Better shadow for readability */
  transition: all 0.3s ease;
}

.hero-section p {
  font-size: 24px;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* Button Styling */
.cta-btn {
  padding: 18px 36px;
  background-color: #00bcd4;
  color: white;
  font-size: 22px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

.cta-btn:hover {
  background-color: #0097a7;
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
}

.cta-btn:focus {
  outline: none;
}

/* Animation for content */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsiveness */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 48px;
  }
  .hero-section p {
    font-size: 20px;
  }
}
</style>
