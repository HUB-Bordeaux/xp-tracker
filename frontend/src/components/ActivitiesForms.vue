<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Student, StudentActivityPost } from '@/interfaces/Students';
import Cookies from 'js-cookie';

export default defineComponent({
    name: 'ActivitiesForms',
    setup(_, { emit }) {
        const studentsList = ref<Student[]>([]);
        const showForm = ref(false);
        const formData = ref({
            name: '',
            category: '',
            xpOrganisation: 0,
            xpParticipation: 0,
            students: [] as StudentActivityPost[],
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
                emit('formSubmitted');
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

        const removeStudentField = () => {
            formData.value.students.pop();
        };

        onMounted(() => {
            fetchStudents();
        });

        return {
            studentsList,
            showForm,
            formData,
            submitForm,
            addStudentField,
            removeStudentField,
        };
    },
});
</script>

<template>
    <div class="students">
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

            <label for="xpOrganisation">XP Organizer:</label>
            <input
                id="xpOrganisation"
                type="number"
                v-model="formData.xpOrganisation"
            />

            <label for="xpParticipation">XP Participant:</label>
            <input
                id="xpParticipation"
                type="number"
                v-model="formData.xpParticipation"
            />

            <div class="students-management">
                <h3>Students</h3>
                <div v-for="(student, index) in formData.students" :key="index" class="student-field">
                    <label for="studentSelect">Select Student: </label>
                    <select id="studentSelect" v-model="student.studentId">
                        <option v-for="stud in studentsList" :key="stud.id" :value="stud.id">{{ stud.id }} {{ stud.firstname }} {{ stud.lastname }}</option>
                    </select>

                    <label for="roleSelect">Select Role: </label>
                    <select id="roleSelect" v-model="student.role">
                        <option value="Organizer">Organizer</option>
                        <option value="Participant">Participant</option>
                    </select>

                    <label class="checkbox-label">
                        Present :
                        <input type="checkbox" v-model="student.present" />
                    </label>
                </div>

                <button @click="addStudentField">Add Another Student</button>
                <button @click="removeStudentField" :disabled="formData.students.length === 0">Remove Last Student</button>
            </div>

            <button @click="submitForm">Submit Activity</button>
        </div>
    </div>
</template>

<style scoped>
.activity-form {
    background-color: #007bff;
    color: white;
    padding: 1rem;
    border-radius: 5px;
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.student-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-bottom: 1px solid white;
    border: 2px solid white;
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
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.625rem 1rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    border: 2px solid white;
    cursor: pointer;
}

button:hover {
    background-color: #004494;
}

label {
    margin-bottom: 0.5rem;
    display: block;
}

input,
select {
    margin-bottom: 1rem;
    width: 20%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

</style>