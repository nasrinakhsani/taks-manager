<template>
  <section class="statistics">
    <div class="stat-card" v-for="(stat, index) in stats" :key="index">
      <h3>{{ stat.title }}</h3>
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-icon">
        <i :class="stat.icon"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        { title: "Total Users", value: 120, icon: "fas fa-users" },
        { title: "Pending Tasks", value: 25, icon: "fas fa-tasks" },
        { title: "Completed Tasks", value: 75, icon: "fas fa-check-circle" },
      ],
    };
  },
};
</script>

<style scoped>
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.stat-card {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
}

.stat-icon {
  margin-top: 10px;
  font-size: 24px;
  color: #0044cc;
}
</style>
