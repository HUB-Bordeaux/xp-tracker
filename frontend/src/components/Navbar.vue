<script lang="ts">
import { useRouter } from 'vue-router';
import { authState } from '../middleware/auth';

export default {
    name: 'AppNavbar',
    setup() {
        const router = useRouter();

        const logout = () => {
            authState.logout();
            router.push({ name: 'login' });
        };

        return {
            authState,
            logout,
        };
    },
};
</script>

<template>
    <nav class="navbar">
        <ul class="nav-left">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/students">Students</router-link></li>
        </ul>
        <img src="../assets/xptracker.png" alt="XP Tracker" class="navbar-logo" />
        <ul class="nav-right" v-if="authState.isAuth">
            <li>
                <button @click="logout" class="logout-btn">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<style scoped>

.navbar {
    background-color: #007bff;
    padding: 0.625rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-left,
.nav-right {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1.25rem;
}

.navbar li {
    display: inline;
}

.navbar a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

.navbar a:hover {
    text-decoration: underline;
}

.navbar-logo {
    max-height: 45px;
    margin-right: 10rem;
}

.logout-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.3125rem 0.625rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 0.25rem;
}

.logout-btn:hover {
    background-color: #e53935;
}
</style>
