<script lang="ts">
import { Student } from '../interfaces/Students';
import StudentCard from '../templates/StudentCard.vue';

export default {
    name: 'StudentsView',
    components: {
        StudentCard,
    },
    data() {
        return {
            students: [
                {id: 1, name: 'Toto', promo: 2027},
                {id: 2, name: 'Titi', promo: 2027},
            ] as Student[],
        };
    },
};
</script>

<template>
    <div class="students">
        <h1>Students List</h1>
        <div class="students-list">
            <StudentCard v-for="student in students" :key="student.id" :student="student">
                <template #footer>
                    <router-link :to="{ name: 'student', params: { id: student.id } }" class="student-card-button">
                        View Profile
                    </router-link>
                </template>
            </StudentCard>
        </div>
    </div>
</template>

<style scoped>

.students {
    text-align: center;
    padding: 20px;
}

.students-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.student-card-button {
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.student-card-button:hover {
    background-color: #0056b3;
}
</style>
