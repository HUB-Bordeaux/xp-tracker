<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'BackButton',
    setup() {
        const router = useRouter();
        const goBack = () => {
            router.push('/students');
        };

        return { goBack };
    },
});
</script>

<template>
    <button class="back-btn" @click="goBack">Back</button>
</template>

<style scoped>
.back-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    position: absolute;
    top: 4rem;
    left: 48%;
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.back-btn:hover {
    background-color: #e53935;
}
</style>
