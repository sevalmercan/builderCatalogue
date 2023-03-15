import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/:username",
    name: "Home",
    component: Home,
    props: true,
    children: [
      {
        path: "my-inventory",
        name: "my-inventory",
        component: () =>
          import("../views/MyInventoryView.vue"),
      },
      {
        path: "bricks-sets",
        name: "bricks-sets",
        component: () =>
          import("../views/BricksSetsView.vue"),
      },
      {
        path: "custom-build",
        name: "custom-build",
        component: () =>
          import("../views/customBuildView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
