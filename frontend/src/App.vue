<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from './components/Navbar.vue';

export default defineComponent({
    name: 'App',
    components: {
        AppNavbar,
    },
    setup() {
        const route = useRoute();
        return {
            route,
        };
    },
});
</script>

<template>
    <div id="app">
        <AppNavbar v-if="route.name !== 'login'" />
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

body {
    margin: 0;
    padding: 0;
}
</style>
