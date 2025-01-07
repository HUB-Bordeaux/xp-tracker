<script lang="ts">
import { defineComponent } from 'vue';
import { Activity } from '../interfaces/Activities';

export default defineComponent({
    name: 'ActivityDetails',
    props: {
        activity: {
            type: Object as () => Activity | null,
            required: true,
        },
    },
});
</script>

<template>
    <div>
        <p v-if="activity">Name: {{ activity.name }}</p>
        <p v-if="activity">Promo: {{ activity.category }}</p>
        <p v-if="activity">XP Organisation: {{ activity.xpOrganisation }}</p>
        <p v-if="activity">XP Participation: {{ activity.xpParticipation }}</p>
    </div>
</template>

<style scoped>
p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
}
</style>
