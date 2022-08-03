import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import GamePage from "../components/gamePage.vue";

import { Auth } from "@/services";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/user/:userName",
    name: "User",
    component: UserProfileView,
  },
  {
    path: "/games/:gameName",
    name: "GamePage",
    component: GamePage,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const userRequired = !publicPages.includes(to.path);
  document.title = `${to.name} - ${process.env.VUE_APP_TITLE}`;
  const user = Auth.getCurrentUser();
  if (userRequired && !user) {
    next("/login");
    return;
  } else next();
});

export default router;
