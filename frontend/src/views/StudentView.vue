<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Student } from '@/interfaces/Students';
import StudentDetails from '@/components/StudentDetails.vue';
import CategoryList from '@/components/StudentCategoryList.vue';
import BackButton from '@/components/BackButton.vue';
import Cookies from 'js-cookie';
import type { CategoryItem } from '@/interfaces/Category';

export interface StudentSelect {
    id: number;
    name: string;
}

export default {
    name: 'StudentView',
    components: { StudentDetails, CategoryList, BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const student = ref<Student | null>(null);
        const students = ref<StudentSelect[]>([]);
        const showForm = ref(false);
        const formData = ref({
            studentId: 0,
            role: 'Participant',
            present: false,
            activityName: '',
            category: '',
            line6: '',
            line7: '',
        });

        const categories = ref([
            {
                name: 'Talk',
                items: [
                    { title: 'Vue.js Basics', xp: '1' },
                    { title: 'Advanced TypeScript', xp: '1' },
                ],
            },
            {
                name: 'User Group',
                items: [
                    { title: 'Frontend Developers', xp: '1' },
                    { title: 'Backend Gurus', xp: '1' },
                ],
            },
            {
                name: 'Hackathon',
                items: [{ title: 'Hack the Future', xp: '10' }],
            },
            {
                name: 'Free Project',
                items: [{ title: 'Portfolio Website', xp: '10' }],
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
                };
                formData.value.studentId = student.value.id;
            } catch (error) {
                console.error('Failed to fetch student:', error);
                alert(`Error: ${error}`);
                router.push({ name: 'students' });
            }
        };

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
                students.value = result.map((student: any) => ({
                    id: student.id,
                    name: `${student.firstname} ${student.lastname}`,
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

        const totalXP = (items: CategoryItem[]): number => {
            return items.reduce((total, item) => total + Number(item.xp), 0);
        };

        onMounted(() => {
            const studentId = Number(route.params.id);
            fetchStudent(studentId);
            fetchStudents();
        });

        return {
            student,
            students,
            categories,
            totalXP,
            showForm,
            formData,
            submitForm,
        };
    },
};
</script>

<template>
    <div class="student">
        <BackButton />
        <h1>Student Details</h1>
        <StudentDetails :student="student" />

        <button class="activity-button" @click="showForm = !showForm">{{ showForm ? 'Hide Form' : 'Add Activity' }}</button>

        <div v-if="showForm" class="activity-form">
            <h2>Add Activity</h2>
            <label for="studentSelect">Select Student: </label>
            <select id="studentSelect" v-model="formData.studentId">
                <option :value="student?.id">{{ student?.firstname }} {{ student?.lastname }}</option>
            </select>


            <label for="roleSelect"> Select Role: </label>
            <select id="roleSelect" v-model="formData.role">
                <option value="Organizer">Organizer</option>
                <option value="Participant">Participant</option>
            </select> <br />

            <label for="categorySelect">Select Category: </label>
            <select id="categorySelect" v-model="formData.category">
                <option value="hackathon">Hackathon</option>
                <option value="usergroup">User Group</option>
                <option value="freeproject">Free Project</option>
                <option value="talk">Talk</option>
            </select> <br />

            <label for="activityName">Activity name:</label> <br />

            <input id="activityName" v-model="formData.activityName" type="text" placeholder="Enter activity name" /> <br />

            <input v-model="formData.line6" type="text" placeholder="Line 6" /> <br />
            <input v-model="formData.line7" type="text" placeholder="Line 7" /> <br />

            <label class="checkbox-label">
                Present :
                <input type="checkbox" v-model="formData.present"/>
            </label> <br />

            <button @click="submitForm">Submit Activity</button>
        </div>
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
