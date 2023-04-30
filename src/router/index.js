import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import User from "../views/user/IndexUser.vue";
import Analyse from "../views/user/Analyse.vue";
import Eval from "../views/user/EvalView.vue";
import UserSettings from "../views/user/Settings.vue";
import { Auth } from 'aws-amplify';

const requireAuth = async (to, from, next) => {
  try {
    await Auth.currentAuthenticatedUser();
    next();
  } catch (error) {
    next({ name: "login" });
  }
};

const requireNoAuth = async (to, from, next) => {
  try {
    await Auth.currentAuthenticatedUser();
    next({ name: "home" });
  } catch (error) {
    next();
  }
};

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
      meta: { guestOnly: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: { requiresAuth: true },
      children: [
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
        {
          path: "/settings",
          name: "settings",
          component: UserSettings,
          props: true,
        },
      ],
    },
    // Fallback
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    await Auth.currentAuthenticatedUser();
    if (to.matched.some((record) => record.meta.guestOnly)) {
      next({ name: 'analyse' });
    } else {
      next();
    }
  } catch (error) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
});

export default router;
