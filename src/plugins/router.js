import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import SetResume from "../pages/SetResume.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/set-resume/:wrapper",
    name: "SetResume",
    component: SetResume,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
