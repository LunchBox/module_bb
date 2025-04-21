import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

// 设置axios基础URL
axios.defaults.baseURL = "http://localhost:8000";

const app = createApp(App);

app.use(router);

app.mount("#app");
