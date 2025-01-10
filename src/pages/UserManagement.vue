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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user._id)">Delete</button>
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

        <label for="editPassword">Password</label>
        <input
          type="password"
          id="editPassword"
          v-model="editUserData.password"
        />

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
        password: "", // Add password
      },
      editUserData: {
        id: null,
        name: "",
        email: "",
        status: "Online",
        password: "", // Add password
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
        const response = await axios.get("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    },
    // Edit a user
    editUser(user) {
      this.editUserData = { ...user }; // Copy user data into editUserData
      this.showEditForm = true; // Show the edit form
    },

    // Update a user
    async updateUser() {
      try {
        const dataToUpdate = {
          name: this.editUserData.name,
          email: this.editUserData.email,
          status: this.editUserData.status,
          password: this.editUserData.password || "", // Send password if changed
        };

        const response = await axios.put(
          `http://localhost:3000/users/${this.editUserData._id}`,
          dataToUpdate,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const index = this.users.findIndex(
          (user) => user.id === response.data.id
        );
        this.users[index] = response.data; // Update user data in the list
        this.showEditForm = false; // Hide the edit form after update
        this.fetchUsers(); // Refresh user list
      } catch (error) {
        console.error("Failed to update user", error);
      }
    },

    // Delete a user
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = this.users.filter((user) => user.id !== userId); // Remove the user from the list
        this.fetchUsers(); // Refresh user list
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
/* User Management Section */
.user-management {
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 1200px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Heading Styles */
h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

h2 {
  font-size: 24px;
  color: #333;
}

/* Form Styles */
.form-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #006699;
}

/* Table Styles */
.user-list {
  margin-top: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

table th,
table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

table th {
  background-color: #007bb5;
  color: white;
}

table tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #007bb5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #005f8c;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-management {
    padding: 15px;
  }

  table th,
  table td {
    font-size: 14px;
  }
}
</style>
