<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Student } from '@/interfaces/Students';
import Cookies from 'js-cookie';
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
        const students = ref<Student[]>([]);
        const selectedPromos = ref<number[]>([]);
        const searchQuery = ref<string>('');
        const showForm = ref(false);
        const alertMessage = ref('');
        const formData = ref({
            firstName: '',
            lastName: '',
            email: '',
            promo: '',
            image: null as File | null,
        });

        const filteredStudents = computed(() =>
            students.value.filter(student =>
                (selectedPromos.value.length === 0 ||
                selectedPromos.value.includes(student.promo)) &&
                `${student.firstname} ${student.lastname}`
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase()))
        );

        const availablePromos = computed(() =>
            Array.from(new Set(students.value.map(student => student.promo)))
        );

        const recentYears  = computed((): number[] => {
            const currentYear = new Date().getFullYear();
            return Array.from({length: 5}, (_, i) => currentYear + i);
        })

        const handleExport = () => {
            const exportData = filteredStudents.value.map(student => ({
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
                promo: student.promo,
            }));

            downloadCSV({
                data: exportData,
                filename: `students_${selectedPromos.value.join('_') || 'all'}`,
                delimiter: ',',
                headers: ['id', 'firstname', 'lastname', 'promo'],
            });
        };

        const togglePromo = (promo: number) => {
            if (selectedPromos.value.includes(promo)) {
                selectedPromos.value = selectedPromos.value.filter(p => p !== promo);
            } else {
                selectedPromos.value.push(promo);
            }
        };

        const toggleForm = () => {
            showForm.value = !showForm.value;
        };

        const handleImageUpload = (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                formData.value.image = input.files[0];
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
                    firstname: student.firstname,
                    lastname: student.lastname,
                    promo: parseInt(student.promotion),
                    image: student.image,
                    imageType: student.imageType,
                }));
            } catch (error) {
                console.error('Failed to fetch students:', error);
                alert(`Error: ${error}`);
            }
        };
        fetchStudents();

        const uploadStudent = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            const data = new FormData();
            data.append('firstName', formData.value.firstName);
            data.append('lastName', formData.value.lastName);
            data.append('email', formData.value.email);
            data.append('promo', formData.value.promo);
            console.log(formData);

            if (formData.value.image) {
                data.append('image', formData.value.image);
            }

            try {
                const response = await fetch('http://localhost:4000/students', {
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                alertMessage.value = `Student ${formData.value.firstName} ${formData.value.lastName} uploaded successfully!`;
                toggleForm();
                await fetchStudents();
            } catch (error) {
                console.error('Failed to upload student:', error);
                alertMessage.value = `Error: ${error}`;
            }

            setTimeout(() => {
                alertMessage.value = '';
            }, 3000);
        };


        return {
            students,
            selectedPromos,
            searchQuery,
            filteredStudents,
            availablePromos,
            recentYears,
            handleExport,
            togglePromo,
            showForm,
            formData,
            toggleForm,
            handleImageUpload,
            alertMessage,
            uploadStudent,
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
        <button class="add-student-button" @click="toggleForm">+ Add Student</button>

        <SearchBar
            :searchQuery="searchQuery"
            @update:searchQuery="searchQuery = $event"
        />

        <div v-if="alertMessage" class="alert">{{ alertMessage }}</div>

        <div v-if="showForm" class="student-form">
            <h2>Add a New Student</h2>
            <input v-model="formData.firstName" type="text" placeholder="First Name" />
            <input v-model="formData.lastName" type="text" placeholder="Last Name" />
            <input v-model="formData.email" type="email" placeholder="Email" />
            <label for="promo-select">Select a promotion: </label>
            <select v-model="formData.promo" id="promo-select">
                <option v-for="year in recentYears" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
            <input type="file" @change="handleImageUpload" accept="image/*" />
            <button @click="uploadStudent">Submit</button>
        </div>

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

.student-form {
    margin: 0 auto;
    padding: 1.5rem;
    background-color: #007bff;
    color: white;
    border: 1px solid #0056b3;
    border-radius: 8px;
    width: 60%;
    max-width: 600px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.student-form input {
    display: block;
    margin: 0.5rem auto;
    padding: 0.5rem;
    width: 90%;
}

.add-student-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.add-student-button:hover {
    background-color: #0056b3;
}

.alert {
    background-color: #d4edda;
    color: #155724;
    padding: 1rem;
    margin: 1rem auto;
    border: 1px solid #c3e6cb;
    border-radius: 0.5rem;
    transition: opacity 0.5s ease;
    max-width: 300px;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
</style>
