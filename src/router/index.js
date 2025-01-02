import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import UserLogin from "@/pages/UserLogin.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import UserTasks from "@/pages/UserTasks.vue";
import UserDashboard from "@/pages/UserDashboard.vue"; // Perbaiki nama impor

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/admin", name: "AdminDashboard", component: AdminDashboard },
  { path: "/tasks", name: "UserTasks", component: UserTasks },
  { path: "/user", name: "UserDashboard", component: UserDashboard }, // Perbaiki path

  // Route untuk logout
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      // Logika logout, seperti menghapus token
      localStorage.removeItem("token");
      // Redirect ke halaman login setelah logout
      next("/login");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
