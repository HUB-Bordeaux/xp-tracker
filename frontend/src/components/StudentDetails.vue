<script lang="ts">
import { defineComponent } from 'vue';
import { Student } from '../interfaces/Students';
import { Icon } from '@iconify/vue';

export default defineComponent({
    name: 'StudentDetails',
    components: { Icon },
    props: {
        student: {
            type: Object as () => Student | null,
            required: true,
        },
    },
});
</script>

<template>
    <div>
        <Icon icon="mdi:account" class="profile-icon"></Icon>
        <p v-if="student">Name: {{ student.name }}</p>
        <p v-if="student">Promo: {{ student.promo }}</p>
    </div>
</template>

<style scoped>
.profile-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
}

</style>
