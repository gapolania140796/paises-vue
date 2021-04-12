import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
/** Aqui delcaramos todas las rutas */
const routes = [
  // Por defecto nos dirigimos siempre a home
  {
    path: "*",
    name: "default",
    component: Home
  },
  // Por defecto apuntamos a home 
  {
    path: "/",
    name: "home",
    component: Home
  },
  // Declaramos una ruta para cada país en el cual recibimos el nombre del país para realizar la búsqueda.
  {
    path: "/about/:countryName",
    name: "about",
    props: true,
    component: () =>
      import("../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
