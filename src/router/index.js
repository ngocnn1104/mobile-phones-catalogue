import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:slug',
    name: 'Phone Details',
    component: () => import(/* webpackChunkName: "phone-details" */ '../views/PhoneDetails.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
