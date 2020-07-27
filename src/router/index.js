import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: {
            name: 'Catalog'
        },
    },
    {
        path: '/list',
        name: 'Catalog',
        component: List,

    },
    {
        path: '/list/:id',
        name: 'View',
        component: () => import('../views/ViewBook.vue'),

    },
    {
        path: '/list/:id/edit',
        name: 'Edit',
        component: () => import('../views/EditBook.vue'),

    },
    {
        path: '/new',
        name: 'New',
        component: () => import('../views/EditBook.vue'),

    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
