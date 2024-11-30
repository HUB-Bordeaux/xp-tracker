<template>
    <div id="app">
        <AppNavbar />
        <router-view />
    </div>
</template>

<script lang="ts">
import AppNavbar from './components/Navbar.vue';

export default {
    name: 'App',
    components: {
        AppNavbar,
    },
};
</script>

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
</style>
