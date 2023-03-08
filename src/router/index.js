import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "my-inventory" },
  },
  {
    path: "/lego-sets",
    name: "lego-sets",

    component: () =>
      import("../views/LegoSetsView.vue"),
  },
  {
    path: "/my-inventory",
    name: "my-inventory",

    component: () =>
      import("../views/MyInventoryView.vue"),
  },
  {
    path: "/custom-built",
    name: "custom-built",

    component: () =>
      import("../views/customBuiltView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
