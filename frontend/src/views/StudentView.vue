<template>
    <div class="student">
        <h1>Student Details</h1>
        <p v-if="student">Name: {{ student.name }}</p>
        <p v-if="student">Age: {{ student.age }}</p>
        <p v-if="student">Age: {{ student.grade }}</p>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Student } from '../interfaces/Students'

export default {
    name: 'StudentView',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const student = ref<Student | null>(null);

        onMounted(() => {
            const studentId = route.params.id;
            alert(studentId)
            // if (studentId == undefined) {
            //     router.push({name: 'students'});
            // }

            const mockStudents = [
                {id: 1, name: 'Toto', age: 20, grade: 'A'},
                {id: 2, name: 'Titi', age: 20, grade: 'A'},
            ];

            student.value = mockStudents.find(s => s.id === Number(studentId)) || null;
            if (student.value == null) {
                router.push({name: 'students'});
            }
        });
        return {
            student,
        };
    },
};
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.button:hover {
    background-color: #369e70;
}
</style>