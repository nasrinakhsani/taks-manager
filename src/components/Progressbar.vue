<template>
  <div class="progress-bar-container">
    <h3>Progress</h3>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <p>{{ progress }}% Completed</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 60, // Example progress (could be dynamic)
    };
  },
};
</script>

<style scoped>
.progress-bar-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 30px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
