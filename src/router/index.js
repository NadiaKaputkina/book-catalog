import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/list',
    name: 'Каталог',
    component: List
  },
  {
    path: '/list/:id',
    name: 'Просмотр',
    component: () => import('../views/EditBook.vue')
  },
  {
    path: '/new',
    name: 'Редактирование',
    component: () => import('../views/EditBook.vue')
  },
  {
    path: '/settings',
    name: 'Настройки',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
