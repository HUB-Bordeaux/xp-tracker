import { createRouter, createWebHistory } from "vue-router";
import { authState } from '../middleware/auth';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import StudentsView from '../views/StudentsView.vue';
import StudentView from '../views/StudentView.vue';
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
        path: '/students',
        name: 'students',
        component: StudentsView,
        meta: { requiresAuth: true },
    },
    {
        path: '/student',
        redirect: '/students',
    },
    {
        path: '/student/:id',
        name: 'student',
        component: StudentView,
        meta: { requiresAuth: true },
        props: true,
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
    authState.checkAuth();

    const isAuthenticated = authState.isAuth;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

router.afterEach((to) => {
    document.title = (to.meta.title as string) || 'XP Tracker';
});

export default router;