<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Student } from '@/interfaces/Students';
import StudentDetails from '@/components/StudentDetails.vue';
import CategoryList from '@/components/StudentCategoryList.vue';
import BackButton from '@/components/BackButton.vue';
import type { CategoryItem } from '@/interfaces/Category';

export default {
    name: 'StudentView',
    components: { StudentDetails, CategoryList, BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const student = ref<Student | null>(null);
        const categories = ref([
            {
                name: 'Talk',
                items: [
                    { title: 'Vue.js Basics', date: '2024-01-15', xp: '1' },
                    { title: 'Advanced TypeScript', date: '2024-02-20', xp: '1' },
                ],
            },
            {
                name: 'User Group',
                items: [
                    { title: 'Frontend Developers', date: '2024-03-10', xp: '1' },
                    { title: 'Backend Gurus', date: '2024-03-25', xp: '1' },
                ],
            },
            {
                name: 'Hackathon',
                items: [{ title: 'Hack the Future', date: '2024-04-05', xp: '10' }],
            },
            {
                name: 'Free Project',
                items: [{ title: 'Portfolio Website', date: '2024-06-01', xp: '10' }],
            },
        ]);

        const totalXP = (items: CategoryItem[]): number => {
            return items.reduce((total, item) => total + Number(item.xp), 0);
        };

        onMounted(() => {
            const studentId = route.params.id;

            const mockStudents = [
                { id: 1, name: 'Toto', promo: 2027 },
                { id: 2, name: 'Titi', promo: 2027 },
                { id: 3, name: 'Tata', promo: 2026 },
            ];

            student.value = mockStudents.find(s => s.id === Number(studentId)) || null;
            if (student.value == null) {
                router.push({ name: 'students' });
            }
        });

        return {
            student,
            categories,
            totalXP,
        };
    },
};
</script>

<template>
    <div class="student">
        <BackButton />
        <h1>Student Details</h1>
        <StudentDetails :student="student" />
        <CategoryList :categories="categories" :totalXP="totalXP" />
    </div>
</template>

<style scoped>
.student {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

p {
    font-size: 1.5rem;
    margin: 0.5rem 0;
}
</style>
