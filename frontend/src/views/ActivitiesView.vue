<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { ActivityWithStudents } from '@/interfaces/Students';
import ActivitiesForms from '@/components/ActivitiesForms.vue';
import ActivitiesList from '@/components/ActivitiesList.vue';
import Cookies from 'js-cookie';

export default defineComponent({
    name: 'ActivitiesView',
    components: { ActivitiesForms, ActivitiesList },
    setup() {
        const activities = ref<ActivityWithStudents[]>([]);

        const fetchActivities = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/activities', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                activities.value = result.map((activity: any) => ({
                    name: activity.name,
                    category: activity.category,
                    xpOrganisation: activity.xpOrganisation,
                    xpParticipation: activity.xpParticipation,
                    students: activity.students.map((student: any) => ({
                        id: student.id,
                        firstname: student.firstname,
                        lastname: student.lastname,
                        role: student.role,
                        present: student.present,
                    })),
                }));
            } catch (error) {
                console.error('Failed to fetch activities:', error);
                alert(`Error: ${error}`);
            }
        };

        onMounted(() => {
            fetchActivities();
        });

        return {
            activities,
            fetchActivities,
        };
    },
});
</script>

<template>
    <div class="students">
        <h1>Activities</h1>
        <ActivitiesForms @formSubmitted="fetchActivities" />
        <ActivitiesList :activities="activities" />
    </div>
</template>


<style scoped>

</style>
