import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

import "./assets/bootstrap.min.js";
import "./assets/fontawesome/js/all.min.js";

createApp(App).use(router).mount("#app");
