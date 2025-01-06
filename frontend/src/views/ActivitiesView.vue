<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Student, StudentActivity, ActivityWithStudents } from '@/interfaces/Students';
import Cookies from 'js-cookie';

export default defineComponent({
    name: 'StudentsView',
    setup() {
        const studentsList = ref<Student[]>([]);
        const activities = ref<ActivityWithStudents[]>([]);
        const showForm = ref(false);
        const showAdditionalFields = ref(false);
        const formData = ref({
            name: '',
            category: '',
            xpOrganisation: 0,
            xpParticipation: 0,
            students: [] as StudentActivity[],
        });

        const fetchStudents = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/students', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                studentsList.value = result.map((student: any) => ({
                    id: student.id,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    promo: parseInt(student.promotion),
                    image: student.image,
                }));
            } catch (error) {
                console.error('Failed to fetch students:', error);
                alert(`Error: ${error}`);
            }
        };

        const submitForm = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/activities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData.value),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                alert('Activity submitted successfully!');
                showForm.value = false;
            } catch (error) {
                console.error('Failed to submit activity:', error);
                alert(`Error: ${error}`);
            }
        };

        const addStudentField = () => {
            formData.value.students.push({
                studentId: 0,
                role: 'Participant',
                present: false,
            });
        };

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
                        studentId: student.studentId,
                        role: student.role,
                        present: student.present,
                    })),
                }));
                console.log('Fetched activities:', activities.value);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
                alert(`Error: ${error}`);
            }
        };

        onMounted(() => {
            fetchStudents();
            fetchActivities();
        });

        return {
            studentsList,
            activities,
            showForm,
            showAdditionalFields,
            formData,
            submitForm,
            addStudentField,
        };
    },
});
</script>

<template>
    <div class="students">
        <h1>Activities</h1>
        <button class="activity-button" @click="showForm = !showForm">{{ showForm ? 'Hide Form' : 'Add Activity' }}</button>

        <div v-if="showForm" class="activity-form">
            <h2>Add Activity</h2>

            <label for="name">Activity name:</label>
            <input id="name" v-model="formData.name" type="text" placeholder="Enter activity name" />

            <label for="categorySelect">Select Category: </label>
            <select id="categorySelect" v-model="formData.category">
                <option value="hackathon">Hackathon</option>
                <option value="usergroup">User Group</option>
                <option value="freeproject">Free Project</option>
                <option value="talk">Talk</option>
            </select>

            <button @click="showAdditionalFields = !showAdditionalFields">{{ showAdditionalFields ? 'Hide Additional Fields' : 'Show Additional Fields' }}</button>

            <div v-if="showAdditionalFields" class="additional-fields">
                <div v-for="(student, index) in formData.students" :key="index" class="student-field">
                    <label for="studentSelect">Select Student: </label>
                    <select id="studentSelect" v-model="student.studentId">
                        <option v-for="stud in studentsList" :key="stud.id" :value="stud.id">{{ stud.firstname }} {{ stud.lastname }}</option>
                    </select>

                    <label for="roleSelect">Select Role: </label>
                    <select id="roleSelect" v-model="student.role">
                        <option value="Organizer">Organizer</option>
                        <option value="Participant">Participant</option>
                    </select>

                    <label for="xpOrganisation">XP Organizer:</label>
                    <input
                        id="xpOrganisation"
                        type="number"
                        v-model="formData.xpOrganisation"
                        :disabled="student.role === 'Participant'"
                    />

                    <label for="xpParticipation">XP Participant:</label>
                    <input
                        id="xpParticipation"
                        type="number"
                        v-model="formData.xpParticipation"
                        :disabled="student.role === 'Organizer'"
                    />

                    <label class="checkbox-label">
                        Present :
                        <input type="checkbox" v-model="student.present" />
                    </label>
                </div>

                <button @click="addStudentField">Add Another Student</button>
            </div>

            <button @click="submitForm">Submit Activity</button>

        </div>
        <ActivitiesList :activities="activities" />
    </div>
</template>

<style scoped>
.activity-form {
    background-color: #007bff;
    color: white;
    padding: 1rem;
    border-radius: 5px;
}

.student-field {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid white;
    padding: 0.5rem 0;
}

input[type='checkbox'] {
    accent-color: green;
}

input:disabled {
    background-color: #e9ecef;
    color: #6c757d;
}

button {
    background-color: #0056b3;
    color: white;
    text-decoration: none;
    padding: 0.625rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

button:hover {
    background-color: #004494;
}

</style>
