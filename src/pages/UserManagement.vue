<template>
  <div class="user-management">
    <h1>User Management</h1>

    <!-- Create User Form -->
    <div v-if="showCreateForm" class="form-container">
      <h2>Create User</h2>
      <form @submit.prevent="createUser">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newUser.name" required />

        <label for="email">Email</label>
        <input type="email" id="email" v-model="newUser.email" required />

        <label for="status">Status</label>
        <select id="status" v-model="newUser.status" required>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <button type="submit">Create User</button>
      </form>
    </div>

    <!-- User List -->
    <div class="user-list">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status }}</td>
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Form -->
    <div v-if="showEditForm" class="form-container">
      <h2>Edit User</h2>
      <form @submit.prevent="updateUser">
        <label for="editName">Name</label>
        <input type="text" id="editName" v-model="editUserData.name" required />

        <label for="editEmail">Email</label>
        <input
          type="email"
          id="editEmail"
          v-model="editUserData.email"
          required
        />

        <label for="editStatus">Status</label>
        <select id="editStatus" v-model="editUserData.status" required>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <button type="submit">Update User</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      newUser: {
        name: "",
        email: "",
        status: "Online",
      },
      editUserData: {
        id: null,
        name: "",
        email: "",
        status: "Online",
      },
      showCreateForm: false,
      showEditForm: false,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // Fetch all users
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8000/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    },

    // Create a new user
    async createUser() {
      try {
        const response = await axios.post(
          "http://localhost:8000/users",
          this.newUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.users.push(response.data); // Add the new user to the users list
        this.newUser = { name: "", email: "", status: "Online" }; // Reset form
        this.showCreateForm = false; // Hide the form
      } catch (error) {
        console.error("Failed to create user", error);
      }
    },

    // Edit a user
    editUser(user) {
      this.editUserData = { ...user };
      this.showEditForm = true;
    },

    // Update a user
    async updateUser() {
      try {
        const response = await axios.put(
          `http://localhost:8000/users/${this.editUserData.id}`,
          this.editUserData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const index = this.users.findIndex(
          (user) => user.id === response.data.id
        );
        this.users[index] = response.data; // Update the user in the list
        this.showEditForm = false; // Hide the form
      } catch (error) {
        console.error("Failed to update user", error);
      }
    },

    // Delete a user
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = this.users.filter((user) => user.id !== userId); // Remove the user from the list
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    },

    // Toggle the Create User Form
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
    },

    // Toggle the Edit User Form
    toggleEditForm() {
      this.showEditForm = !this.showEditForm;
    },
  },
};
</script>

<style scoped>
/* Styles for the user management section */
.user-management {
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
}

.form-container {
  margin-bottom: 30px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bb5;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #006699;
}

.user-list {
  margin-top: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #007bb5;
  color: white;
}

button {
  padding: 5px 10px;
  margin-right: 10px;
}

button:hover {
  background-color: #005f8c;
}
</style>
