import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import User from "../views/user/IndexUser.vue";
import Analyse from "../views/user/Analyse.vue";
import Eval from "../views/user/EvalView.vue";
import History from "../views/user/History.vue";
import Rafale from "../views/user/Rafale.vue";
import Settings from "../views/user/Settings.vue";
import Admin from "../views/admin/Admin.vue";
import UsersList from "../views/admin/UsersList.vue";
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
        {
          path: "history",
          name: "history",
          component: History,
          props: true,
        },
        {
          path: "rafale",
          name: "rafale",
          component: Rafale,
          props: true,
        },
      ],
    },
    {
      path: "/adminpanel",
      name: "adminpanel",
      component: Admin,
      meta: { isSuperAdmin: true },
      children: [
        {
          path: "/users-list",
          name: "users-list",
          component: UsersList,
        }
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
  const userStore = useUserStore();
  if (!userStore.isLoggedIn) {
    await userStore.fetchUserData();
  }

  try {
    await Auth.currentAuthenticatedUser();
    if (userStore.isActiveUser !== '1') {
      await userStore.signOut();
      alert("Le compte n'est pas actif.")
      next({ name: "home" });
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
      next({ name: "analyse" });
    } else if (to.matched.some((record) => record.meta.isSuperAdmin && !userStore.isSuperAdmin)) {
      next({ name: "home" });
    } else {
      next();
    }
  } catch (error) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({ name: "home" });
    } else {
      next();
    }
  }
});
export default router;
