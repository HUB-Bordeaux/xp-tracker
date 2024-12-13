<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Student } from '../interfaces/Students';

export default {
    name: 'StudentView',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const student = ref<Student | null>(null);

        onMounted(() => {
            const studentId = route.params.id;

            const mockStudents = [
                { id: 1, name: 'Toto', promo: 2027 },
                { id: 2, name: 'Titi', promo: 2027 },
            ];

            student.value = mockStudents.find(s => s.id === Number(studentId)) || null;
            if (student.value == null) {
                router.push({ name: 'students' });
            }
        });

        return {
            student,
            goBack: () => router.push('/students'),
        };
    },
};
</script>

<template>
    <div class="student">
        <button class="back-btn" @click="goBack">Back</button>
        <h1>Student Details</h1>
        <p v-if="student">Name: {{ student.name }}</p>
        <p v-if="student">Promo: {{ student.promo }}</p>
    </div>
</template>

<style scoped>
.back-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    position: absolute;
    top: 5rem;
    left: 1rem;
}

.back-btn:hover {
    background-color: #e53935;
}
</style>
