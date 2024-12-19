<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Student } from '@/interfaces/Students';
import StudentCard from '@/templates/StudentCard.vue';
import PromoFilter from '@/components/PromoFilter.vue';
import SearchBar from '@/components/SearchBar.vue';
import downloadCSV from 'json-to-csv-export';

export default defineComponent({
    name: 'StudentsView',
    components: {
        StudentCard,
        PromoFilter,
        SearchBar,
    },
    setup() {
        const students = ref<Student[]>([
            { id: 1, name: 'Toto', promo: 2027 },
            { id: 2, name: 'Titi', promo: 2027 },
            { id: 3, name: 'Tata', promo: 2026 },
        ]);
        const selectedPromos = ref<number[]>([]);
        const searchQuery = ref<string>('');

        const filteredStudents = computed(() =>
            students.value.filter(
                student =>
                    (selectedPromos.value.length === 0 ||
                        selectedPromos.value.includes(student.promo)) &&
                    student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );

        const availablePromos = computed(() =>
            Array.from(new Set(students.value.map(student => student.promo)))
        );

        const handleExport = () => {
            downloadCSV({
                data: filteredStudents.value,
                filename: `students_${selectedPromos.value.join('_') || 'all'}`,
                delimiter: ',',
                headers: ['id', 'name', 'promo'],
            });
        };

        const togglePromo = (promo: number) => {
            if (selectedPromos.value.includes(promo)) {
                selectedPromos.value = selectedPromos.value.filter(p => p !== promo);
            } else {
                selectedPromos.value.push(promo);
            }
        };

        return {
            students,
            selectedPromos,
            searchQuery,
            filteredStudents,
            availablePromos,
            handleExport,
            togglePromo,
        };
    },
});
</script>

<template>
    <div class="students">
        <h1>Students List</h1>

        <PromoFilter
            :availablePromos="availablePromos"
            :selectedPromos="selectedPromos"
            :togglePromo="togglePromo"
        />

        <button class="export-button" @click="handleExport">Export CSV</button>

        <SearchBar
            :searchQuery="searchQuery"
            @update:searchQuery="searchQuery = $event"
        />

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
    padding: 1.25rem;
}

.export-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 1rem;
}

.export-button:hover {
    background-color: #218838;
}

.students-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.student-card-button {
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.625rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.student-card-button:hover {
    background-color: #0056b3;
}
</style>
