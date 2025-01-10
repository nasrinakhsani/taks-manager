import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import UserLogin from "@/pages/UserLogin.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import UserTasks from "@/pages/UserTasks.vue";
import UserDashboard from "@/pages/UserDashboard.vue";
import UserSignup from "@/pages/UserSignup.vue";
import AddTask from "@/pages/AddTask.vue";
import UserManagement from "@/pages/UserManagement.vue";
import PageNotFound from "@/pages/PageNotFound.vue"; // Import PageNotFound

// Helper function to get user role from localStorage
function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Decode token if it's a JWT (assuming JWT structure here)
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.role; // Assuming the role is stored in the "role" field
  } catch (e) {
    return null;
  }
}

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/signup", name: "UserSignup", component: UserSignup },
  { path: "/notFound", name: "PageNotFound", component: PageNotFound },

  // Route untuk Admin hanya bisa diakses oleh Admin
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (role === "admin") {
        next();
      } else {
        next("/notFound"); // Redirect to /notFound if not admin
      }
    },
  },

  // Route untuk User hanya bisa diakses oleh User
  {
    path: "/tasks",
    name: "UserTasks",
    component: UserTasks,
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (role === "user") {
        next();
      } else {
        next("/notFound"); // Redirect to /notFound if not user
      }
    },
  },

  // Route untuk User hanya bisa diakses oleh User
  {
    path: "/user",
    name: "UserDashboard",
    component: UserDashboard,
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (role === "user") {
        next();
      } else {
        next("/notFound"); // Redirect to /notFound if not user
      }
    },
  },

  // Route untuk AddTask hanya bisa diakses oleh User
  {
    path: "/add",
    name: "AddTask",
    component: AddTask,
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (role === "user") {
        next();
      } else {
        next("/notFound"); // Redirect to /notFound if not user
      }
    },
  },

  // Route untuk UserManagement hanya bisa diakses oleh Admin
  {
    path: "/user-management",
    name: "UserManagement",
    component: UserManagement,
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (role === "admin") {
        next();
      } else {
        next("/notFound"); // Redirect to /notFound if not admin
      }
    },
  },

  // Route for logout
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("token");
      next("/login");
    },
  },

  // Catch-all route for Page Not Found (404) when navigating to an unknown route
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
