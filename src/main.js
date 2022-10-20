import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

import "./assets/bootstrap.min.js";

createApp(App).use(router).mount("#app");
