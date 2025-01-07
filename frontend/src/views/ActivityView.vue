<script lang="ts">
import { ref, onMounted } from 'vue';
import BackButton from '@/components/BackButton.vue';
import ActivityDetails from '@/components/ActivityDetails.vue';
import StudentCard from '@/templates/StudentCard.vue';
import { Activity } from '@/interfaces/Activities';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {
    name: 'ActivityView',
    components: {
        BackButton,
        ActivityDetails,
        StudentCard,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const activity = ref<Activity | null>(null);

        const fetchActivity = async (activityId: number) => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/activities/${activityId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                activity.value = {
                    id: result.id,
                    name: result.name,
                    category: result.category,
                    xpOrganisation: result.xpOrganisation,
                    xpParticipation: result.xpParticipation,
                    students: result.students || [],
                };
            } catch (error) {
                console.error('Failed to fetch activity:', error);
                alert(`Error: ${error}`);
                router.push({ name: 'activities' });
            }
        }

        onMounted(() => {
            const activityId = Number(route.params.id);
            fetchActivity(activityId);
        });
        return {
            activity,
        }
    },
}
</script>

<template>
    <div class="activity">
        <BackButton />
        <h1>Activity Details</h1>
        <ActivityDetails :activity="activity" />
        <StudentCard
            v-for="student in activity.students"
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
</template>

<style scoped>
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