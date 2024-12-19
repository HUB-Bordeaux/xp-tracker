<template>
    <div class="search">
        <input
            id="search"
            type="text"
            :value="searchQuery"
            @input="updateSearchQuery"
            placeholder="Enter student name..."
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchBar',
    props: {
        searchQuery: {
            type: String,
            required: true,
        },
    },
    methods: {
        updateSearchQuery(event: Event) {
            const input = event.target as HTMLInputElement;
            this.$emit('update:searchQuery', input.value);
        },
    },
});
</script>

<style scoped>
.search {
    margin-bottom: 1.5rem;
}

.search input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 20%;
}
</style>
