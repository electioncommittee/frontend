import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "./views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/president",
    name: "president",
    component: () => import("./views/President.vue")
  },
  {
    path: "/legislator",
    name: "legislator",
    component: () => import("./views/Legislator.vue")
  },
  {
    path: "/local",
    name: "local",
    component: () => import("./views/Local.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
