<template>
  <div class="task-card" v-for="task in tasks" :key="task.id">
    <div class="task-header">
      <h3>Task #{{ task.id }}</h3>
      <span :class="getStatusClass(task.status)">{{ task.status }}</span>
    </div>
    <div class="task-body">
      <p>Description: {{ task.description }}</p>
      <p>Assigned to: {{ task.assignedTo }}</p>
    </div>
    <div class="task-footer">
      <button @click="changeTaskStatus(task.id)">Change Status</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, status: 'Pending', description: 'Task description goes here', assignedTo: 'John Doe' },
        { id: 2, status: 'In Progress', description: 'Task description goes here', assignedTo: 'Jane Smith' },
        { id: 3, status: 'Completed', description: 'Task description goes here', assignedTo: 'Alice Brown' },
      ],
    };
  },
  methods: {
    changeTaskStatus(taskId) {
      // Change task status logic
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        if (task.status === 'Pending') {
          task.status = 'In Progress';
        } else if (task.status === 'In Progress') {
          task.status = 'Completed';
        } else {
          task.status = 'Pending';
        }
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 'Pending':
          return 'status-pending';
        case 'In Progress':
          return 'status-progress';
        case 'Completed':
          return 'status-completed';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
.task-card {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-header h3 {
  font-size: 18px;
  margin: 0;
}

.task-header span {
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
}

.task-body {
  margin-top: 10px;
}

.task-footer {
  margin-top: 20px;
  text-align: right;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.status-pending {
  background-color: #ff9f43;
}

.status-progress {
  background-color: #17a2b8;
}

.status-completed {
  background-color: #28a745;
}
</style>
