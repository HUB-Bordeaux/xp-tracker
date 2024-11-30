<template>
    <div class="home">
        <h1>Welcome to Home Page</h1>
        <p>This is a basic Vue 3 home page built with Typescript.</p>
    </div>
</template>

<script lang="ts">
export default {
    name: 'HomeView',
};
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.button:hover {
    background-color: #369e70;
}
</style>