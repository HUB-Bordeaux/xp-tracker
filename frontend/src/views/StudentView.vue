<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Student, Activity } from '@/interfaces/Students';
import type { Category, CategoryItem } from '@/interfaces/Category';
import StudentDetails from '@/components/StudentDetails.vue';
import CategoryList from '@/components/StudentCategoryList.vue';
import BackButton from '@/components/BackButton.vue';
import Cookies from 'js-cookie';

export default {
    name: 'StudentView',
    components: { StudentDetails, CategoryList, BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const student = ref<Student | null>(null);

        const categories = ref<Category[]>([
            {
                name: 'Talk',
                items: [],
            },
            {
                name: 'User Group',
                items: [],
            },
            {
                name: 'Hackathon',
                items: [],
            },
            {
                name: 'Free Project',
                items: [],
            },
        ]);

        const fetchStudent = async (studentId: number) => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/students/${studentId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                student.value = {
                    id: result.id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    promo: parseInt(result.promotion),
                    image: result.image,
                    activities: result.activities || [],
                };
                processActivities(student.value);
            } catch (error) {
                console.error('Failed to fetch student:', error);
                alert(`Error: ${error}`);
                router.push({ name: 'students' });
            }
        };

        const processActivities = (student: Student) => {
            categories.value.forEach(category => {
                category.items = [];
            });

            student.activities.forEach((activity: Activity) => {
                const organizerXp = activity.role === 'Organizer'
                    ? activity.xpOrganisation
                    : 0;

                const partcipantXp = activity.role === 'Participant'
                    ? activity.xpParticipation
                    : 0;

                const categoryIndex = (() => {
                    switch (activity.category) {
                        case 'talk': return 0;
                        case 'usergroup': return 1;
                        case 'hackathon': return 2;
                        case 'freeproject': return 3;
                        default: return -1;
                    }
                })();

                if (categoryIndex !== -1) {
                    categories.value[categoryIndex].items.push({
                        title: activity.name,
                        role: activity.role,
                        xpOrganisation: organizerXp.toString(),
                        xpParticipation: partcipantXp.toString(),
                    });
                }
            });
        };

        const totalXP = (items: CategoryItem[]): number => {
            return items.reduce((total, item) => total + Number(item.xpOrganisation) + Number(item.xpParticipation), 0);
        };

        onMounted(() => {
            const studentId = Number(route.params.id);
            fetchStudent(studentId);
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

h1 {
    margin-top: 3rem;
}
</style>
