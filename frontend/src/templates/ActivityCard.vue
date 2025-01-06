<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Activity } from '../interfaces/Activities';

export default defineComponent({
    name: 'ActivityCard',
    props: {
        activity: {
            type: Object as PropType<Activity>,
            required: true,
        },
    },
    methods: {
        defaultAction() {
        },
    },
});
</script>

<template>
    <div class="activity-card">
        <div class="activity-card-header">
            <h3 class="activity-name">{{ activity.name }}</h3>
        </div>
        <div class="activity-card-body">
            <p><strong>Category:</strong> {{ activity.category }} </p>
        </div>
        <div class="activity-card-footer">
            <slot name="footer">
                <button @click="defaultAction">View Activity</button>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.activity-card {
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 1rem 0;
    background-color: #fff;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.activity-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
}

.activity-name {
    margin-top: 0.3125rem;
}

.activity-image {
    width: 6.25rem;
    height: 6.25rem;
    object-fit: cover;
    border-radius: 50%;
}

.activity-card-body {
    font-size: 1.25rem;
    text-align: center;
    margin-top: -1.25rem;
}

.activity-card-footer {
    text-align: center;
}
</style>