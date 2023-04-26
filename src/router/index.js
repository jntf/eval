import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import User from "../views/user/IndexUser.vue";
import Analyse from "../views/user/Analyse.vue";
import Eval from "../views/user/EvalView.vue";
import { Auth } from 'aws-amplify';

const requireAuth = (to, from, next) => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      // User is authenticated, allow access to route
      next();
    })
    .catch(() => {
      // User is not authenticated, redirect to home page
      next({ name: "home" });
    });
};

// Ajouter la redirection vers /user/analyse
const requireAuthWithRedirection = (to, from, next) => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      // User is authenticated, redirect to analysis page
      next({ name: "analyse" });
    })
    .catch(() => {
      // User is not authenticated, allow access to route
      next({ name: "home" });
    });
};

const requireNoAuth = (to, from, next) => {
  Auth.currentAuthenticatedUser()
    .then(() => {
      // User is authenticated, redirect to analysis page
      next({ name: "analyse" });
    })
    .catch(() => {
      // User is not authenticated, allow access to route
      next();
    });
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
      beforeEnter: requireNoAuth,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: requireNoAuth,
    },
    {
      path: "/user",
      name: "user",
      component: User,
      beforeEnter: requireAuth,
      children: [
        {
          path: "analyse",
          name: "analyse",
          component: Analyse,
          beforeEnter: requireAuth,
        },
        {
          path: "eval",
          name: "eval",
          component: Eval,
          props: true,
          beforeEnter: requireAuth,
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

export default router;
