<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PromoFilter',
    props: {
        availablePromos: {
            type: Array as () => number[],
            required: true,
        },
        selectedPromos: {
            type: Array as () => number[],
            required: true,
        },
        togglePromo: {
            type: Function,
            required: true,
        },
    },
});
</script>

<template>
    <div class="filter-container">
        <div>
            <label>Filter by Promotions:</label>
            <div class="checkbox-group">
                <div
                    v-for="promo in availablePromos"
                    :key="promo"
                    class="checkbox-item"
                >
                    <input
                        type="checkbox"
                        :id="`promo-${promo}`"
                        :value="promo"
                        @change="togglePromo(promo)"
                    />
                    <label :for="`promo-${promo}`">{{ promo }}</label>
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
