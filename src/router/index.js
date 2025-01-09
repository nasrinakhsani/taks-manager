import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import UserLogin from "@/pages/UserLogin.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import UserTasks from "@/pages/UserTasks.vue";
import UserDashboard from "@/pages/UserDashboard.vue";
import UserSignup from "@/pages/UserSignup.vue";
import AddTask from "@/pages/AddTask.vue";
import UserManagement from "@/pages/UserManagement.vue"; // Update import for UserManagement

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/admin", name: "AdminDashboard", component: AdminDashboard },
  { path: "/tasks", name: "UserTasks", component: UserTasks },
  { path: "/user", name: "UserDashboard", component: UserDashboard },
  { path: "/signup", name: "UserSignup", component: UserSignup },
  { path: "/add", name: "AddTask", component: AddTask },
  {
    path: "/user-management",
    name: "UserManagement",
    component: UserManagement,
  }, // Added route for User Management

  // Route for logout
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("token");
      next("/login");
    },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
