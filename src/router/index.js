import { createRouter, createWebHistory } from "vue-router";
import TheWelcome from "./../components/TheWelcome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TheWelcome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
