<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModuleFilter',
    props: {
        availableModules: {
            type: Array as () => string[],
            required: true,
        },
        selectedModules: {
            type: Array as () => string[],
            required: true,
        },
        toggleModule: {
            type: Function,
            required: true,
        },
    },
});
</script>

<template>
    <div class="filter-container">
        <div>
            <label>Filter by Modules:</label>
            <div class="checkbox-group">
                <div v-for="mod in availableModules" :key="mod" class="checkbox-item">
                    <input type="checkbox" :id="`module-${mod}`" :value="mod" @change="toggleModule(mod)"/>
                    <label :for="`module-${mod}`">{{ mod }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.checkbox-group {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.checkbox-item {
    display: flex;
    align-items: center;
}

.checkbox-item label {
    margin-left: 0.35rem;
    font-size: 1.5rem;
}
</style>