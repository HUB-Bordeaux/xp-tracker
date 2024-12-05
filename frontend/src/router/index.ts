import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    
    if (to.meta.requiresAuth && !isAuthenticated)
        next({ name: 'login' });
    else
        next();
});

export default router;