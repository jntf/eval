import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import User from "../views/user/IndexUser.vue";
import Analyse from "../views/user/Analyse.vue";
import Eval from "../views/user/EvalView.vue";
import Settings from "../views/user/Settings.vue";
import { Auth } from "aws-amplify";
import { useUserStore } from "../stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
          path: "analyse",
          name: "analyse",
          component: Analyse,
          props: true,
        },
        {
          path: "eval",
          name: "eval",
          component: Eval,
          props: true,
        },
        {
          path: "settings",
          name: "settings",
          component: Settings,
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
  const pinia = router.pinia; // Récupérez l'instance Pinia à partir de l'instance du routeur
  const userStore = useUserStore(pinia); // Utilisez le store avec l'instance Pinia

  try {
    await Auth.currentAuthenticatedUser();
    if (to.matched.some((record) => record.meta.guestOnly)) {
      next({ name: "analyse" });
    } else {
      next();
    }
  } catch (error) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({ name: "login" });
    } else {
      next();
    }
  }
});
router.beforeEach(async (to, from, next) => {
  const pinia = router.pinia;
  const userStore = useUserStore(pinia);

  try {
    await Auth.currentAuthenticatedUser();
    if (to.matched.some((record) => record.meta.guestOnly)) {
      next({ name: "analyse" });
    } else {
      next();
    }
  } catch (error) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({ name: "login" }); // Redirection vers la page de connexion
    } else {
      next();
    }
  }
});

export default router;
