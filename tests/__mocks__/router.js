import { createRouter } from "vue-router";

const mockRouter = createRouter({
  history: {
    push: jest.fn(),
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: {
        template: "<div>Home</div>",
      },
    },
    {
      path: "/login",
      name: "login",
      component: {
        template: "<div>Login</div>",
      },
    },
    {
      path: "/adminpanel",
      name: "adminpanel",
      component: {
        template: "<div>Admin Panel</div>",
      },
      meta: { isSuperAdmin: true },
      children: [
        {
          path: "/users-list",
          name: "users-list",
          component: {
            template: "<div>Users List</div>",
          },
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      component: {
        template: "<div>User</div>",
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: "analyse",
          name: "analyse",
          component: {
            template: "<div>Analysis</div>",
          },
          props: true,
        },
        {
          path: "eval",
          name: "eval",
          component: {
            template: "<div>Evaluation</div>",
          },
          props: true,
        },
        {
          path: "settings",
          name: "settings",
          component: {
            template: "<div>Settings</div>",
          },
          props: true,
        },
        {
          path: "history",
          name: "history",
          component: {
            template: "<div>History</div>",
          },
          props: true,
        },
        {
          path: "rafale",
          name: "rafale",
          component: {
            template: "<div>Rafale</div>",
          },
          props: true,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

export default mockRouter;
