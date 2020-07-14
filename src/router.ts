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
    path: "/legislator-at-large",
    name: "legislator-at-large",
    component: () => import("./views/LegislatorAtLarge.vue")
  },
  {
    path: "/local",
    name: "local",
    component: () => import("./views/Local.vue")
  },
  {
    path: "/referendum",
    name: "referendum",
    component: () => import("./views/Referendum.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
