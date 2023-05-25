import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { Amplify, Storage } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
Amplify.configure({
  API: {
    endpoints: [
      {
        name: "eval-lambda",
        endpoint: import.meta.env.VITE_EVAL_ENDPOINT,
      },
      {
        name: "evaladminusers",
        endpoint: import.meta.env.VITE_EVAL_ENDPOINT,
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: "eval-bulk-import81726-dev",
      region: "us-east-1",
    },
  },
});
Storage.configure({ level: "private" });

import "./assets/main.css";

const pinia = createPinia();
router.pinia = pinia;

const app = createApp(App);
app.config.debug = true;
app.use(router);
app.use(pinia);
app.mount("#app");
