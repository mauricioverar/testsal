import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/equipos',
    name: 'Equipos',
    component: () => import(/* webpackChunkName: "equipos" */ '../views/Equipos.vue')
  },
  {
    path: '/planes',
    name: 'Planes',
    component: () => import(/* webpackChunkName: "planes" */ '../views/Planes.vue')
  },
  {
    path: '/prepago',
    name: 'Prepago',
    component: () => import(/* webpackChunkName: "prepago" */ '../views/Prepago.vue')
  },
  {
    path: '/oficina',
    name: 'Oficina',
    component: () => import(/* webpackChunkName: "oficina" */ '../views/Oficina.vue')
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
