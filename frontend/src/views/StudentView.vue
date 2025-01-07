<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Student, ActivityInfo } from '@/interfaces/Students';
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
        const showForm = ref(false);
        const formData = ref({
            name: '',
            category: '',
            xpOrganisation: 0,
            xpParticipation: -1,
            students: [
                {
                    studentId: 0,
                    role: 'Participant',
                    present: false,
                },
            ],
        });

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
                    imageType: result.imageType,
                    activities: result.activities || [],
                };
                processActivities(student.value.activities);
                formData.value.students[0].studentId = student.value.id;
            } catch (error) {
                console.error('Failed to fetch student:', error);
                alert(`Error: ${error}`);
                router.push({ name: 'students' });
            }
        };

        const processActivities = (activities: ActivityInfo[]) => {
            categories.value.forEach(category => {
                category.items = [];
            });

            activities.forEach((activity: ActivityInfo) => {
                switch (activity.category) {
                    case 'talk':
                        categories.value[0].items.push({
                            title: activity.name,
                            xpOrganisation: activity.xpOrganisation.toString(),
                            xpParticipation: activity.xpParticipation.toString(),
                        });
                        break;
                    case 'usergroup':
                        categories.value[1].items.push({
                            title: activity.name,
                            xpOrganisation: activity.xpOrganisation.toString(),
                            xpParticipation: activity.xpParticipation.toString(),
                        });
                        break;
                    case 'hackathon':
                        categories.value[2].items.push({
                            title: activity.name,
                            xpOrganisation: activity.xpOrganisation.toString(),
                            xpParticipation: activity.xpParticipation.toString(),
                        });
                        break;
                    case 'freeproject':
                        categories.value[3].items.push({
                            title: activity.name,
                            xpOrganisation: activity.xpOrganisation.toString(),
                            xpParticipation: activity.xpParticipation.toString(),
                        });
                        break;
                }
            });
        };

        const formsPresenceUpdater = () => {
            const student = formData.value.students[0];

            if (!student.present) {
                if (student.role === 'Organizer') {
                    formData.value.xpOrganisation = -7;
                    formData.value.xpParticipation = 0;
                }
                if (student.role === 'Participant') {
                    formData.value.xpParticipation = -1;
                    formData.value.xpOrganisation = 0;
                }
            } else {
                formData.value.xpOrganisation = 0;
                formData.value.xpParticipation = 0;
            }
        };

        const totalXP = (items: CategoryItem[]): number => {
            return items.reduce((total, item) => total + Number(item.xpOrganisation) + Number(item.xpParticipation), 0);
        };

        onMounted(() => {
            const studentId = Number(route.params.id);
            fetchStudent(studentId);
        });

        watch(
            () => [formData.value.students[0].present, formData.value.students[0].role],
            formsPresenceUpdater
        );

        return {
            student,
            categories,
            totalXP,
            showForm,
            formData,
            formsPresenceUpdater,
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

.activity-form {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: left;
    background-color: #007bff;
    color: white;
    border-radius: 0.25rem;
}

.activity-form input {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 80%;
}

.activity-form select {
    margin-bottom: 1rem;
}

.activity-form label {
    margin: 0;
}

.activity-form .checkbox-label {
    display: flex;
    align-items: center;
}

.activity-form input[type="checkbox"] {
    transform: scale(1.5);
    accent-color: green;
}

.activity-form input:disabled {
    background-color: #e9ecef;
    color: #6c757d;
}

.activity-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.activity-button:hover {
    background-color: #0056b3;
}
</style>
