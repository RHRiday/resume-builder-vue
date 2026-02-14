import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import router from "./plugins/router";
import "./plugins/FontAwesome";
import { setupBackButton } from "./plugins/handleExit";

createApp(App).use(router).component("fa-icon", FontAwesomeIcon).mount("#app");

setupBackButton(router);
