<script lang="ts">
import { defineComponent } from 'vue';
import type { ActivityWithStudents } from '@/interfaces/Students';

export default defineComponent({
    name: 'ActivitiesList',
    props: {
        activities: {
            type: Array as () => ActivityWithStudents[],
            required: true,
        },
    },
});
</script>

<template>
    <div class="activities-list">
        <h2>List of Activities</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>XP Organisation</th>
                    <th>XP Participation</th>
                    <th>Students</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in activities" :key="activity.name">
                    <td>{{ activity.name }}</td>
                    <td>{{ activity.category }}</td>
                    <td>{{ activity.xpOrganisation }}</td>
                    <td>{{ activity.xpParticipation }}</td>
                    <td>
                        <ul>
                            <li v-for="student in activity.students" :key="student.id">
                                {{ student.firstname }} {{ student.lastname }} - {{ student.role }} - {{ student.present ? 'Present' : 'Not present' }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.activities-list {
    width: 70%;
    margin: 2rem auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    text-align: left;
}

th,
td {
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #ffffff;
}

th {
    background-color: #54a7ff;
    color: white;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
