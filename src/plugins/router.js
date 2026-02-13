import { createRouter, createWebHashHistory } from "vue-router";
import TheWelcome from "./../components/TheWelcome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TheWelcome,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
