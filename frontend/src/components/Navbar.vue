<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li v-if="auth.isAuthenticated">
                <button @click="logout" class="logout-btn">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import auth from '../auth';
export default {
    name: 'AppNavbar',
    setup() {
        const router = useRouter();
        const logout = () => {
            auth.isAuthenticated = false;
            router.push({name: 'login'});
        };
        return {
            auth,
            logout
        }
    }
};
</script>

<style scoped>
.navbar {
    background-color: #42b983;
    padding: 10px;
}

.navbar ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
}

.navbar li {
    display: inline;
}

.navbar a {
    color: white;
    text-decoration: none;
}

.navbar a:hover {
    text-decoration: underline;
}

.logout-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
}

.logout-btn:hover {
    background-color: #e53935;
}
</style>