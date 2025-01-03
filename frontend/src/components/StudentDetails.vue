<script lang="ts">
import { defineComponent } from 'vue';
import { Student } from '../interfaces/Students';

export default defineComponent({
    name: 'StudentDetails',
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
        <img
            v-if="student"
            :src="student.image ? `data:image/png;base64,${student.image}` : 'default-image.png'"
            alt="Student Image"
            class="profile-icon"
        />
        <p v-if="student">Name: {{ student.firstname }} {{ student.lastname }}</p>
        <p v-if="student">Promo: {{ student.promo }}</p>
    </div>
</template>

<style scoped>
.profile-icon {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    margin-bottom: 1rem;
}

p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
}
</style>
