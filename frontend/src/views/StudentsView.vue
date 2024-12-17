<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Student } from '../interfaces/Students';
import StudentCard from '../templates/StudentCard.vue';
import downloadCSV from 'json-to-csv-export';

export default defineComponent({
    name: 'StudentsView',
    components: {
        StudentCard,
    },
    setup() {
        const students = ref<Student[]>([
            { id: 1, name: 'Toto', promo: 2027 },
            { id: 2, name: 'Titi', promo: 2027 },
            { id: 3, name: 'Tata', promo: 2026 },
        ]);
        const selectedPromo = ref<number | null>(null);
        const filteredStudents = computed(() =>
            selectedPromo.value
                ? students.value.filter(student => student.promo === selectedPromo.value)
                : students.value
        );
        const availablePromos = computed(() =>
            Array.from(new Set(students.value.map(student => student.promo)))
        );
        const handleExport = () => {
            downloadCSV({
                data: filteredStudents.value,
                filename: `students_${selectedPromo.value || 'all'}`,
                delimiter: ',',
                headers: ['id', 'name', 'promo'],
            });
        };
        return {
            students,
            selectedPromo,
            filteredStudents,
            availablePromos,
            handleExport,
        };
    },
});
</script>

<template>
    <div class="students">
        <h1>Students List</h1>

        <div class="filter">
            <label for="promo-select">Filter by Promotion: </label>
            <select id="promo-select" v-model="selectedPromo">
                <option :value="null">All Promotions</option>
                <option v-for="promo in availablePromos" :key="promo" :value="promo">
                    {{ promo }}
                </option>
            </select>
        </div>

        <div class="actions">
            <button class="export-button" @click="handleExport">Export CSV</button>
        </div>

        <div class="students-list">
            <StudentCard
                v-for="student in filteredStudents"
                :key="student.id"
                :student="student"
            >
                <template #footer>
                    <router-link
                        :to="{ name: 'student', params: { id: student.id } }"
                        class="student-card-button"
                    >
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

.filter {
    margin-bottom: 20px;
}

.export-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 16px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
}

.export-button:hover {
    background-color: #218838;
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
