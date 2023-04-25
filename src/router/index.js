import { createRouter, createWebHistory } from "vue-router";
import Analyse from "../views/Analyse.vue";
import Home from "../views/Home.vue";
import Eval from "../views/EvalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "home" },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/analyse",
      name: "analyse",
      component: Analyse,
    },
    {
      path: "/eval",
      name: "eval",
      component: Eval,
      props: true,
    },
    // Fallback
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "evaluation" },
    },
  ],
});

export default router;
