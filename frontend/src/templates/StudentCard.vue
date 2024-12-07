<template>
    <div class="student-card">
        <div class="student-card-header">
            <h3>{{ student.name }}</h3>
        </div>
        <div class="student-card-body">
            <p><strong>Age:</strong> {{ student.age }}</p>
            <p><strong>Grade:</strong> {{ student.grade }}</p>
        </div>
        <div class="student-card-footer">
            <slot name="footer">
                <button @click="defaultAction" class="student-card-button">View Details</button>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Student } from '../interfaces/Students';

export default defineComponent({
    name: 'StudentCard',
    props: {
        student: {
            type: Object as PropType<Student>,
            required: true,
        },
    },
    methods: {
        defaultAction() {
            alert(`Viewing details for ${this.student.name}`);
        },
    },
});
</script>

<style scoped>
.student-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.student-card-header {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 8px;
}

.student-card-body p {
    margin: 4px 0;
}

.student-card-footer {
    margin-top: 12px;
    text-align: right;
}

.student-card-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.student-card-button:hover {
    background-color: #369e70;
}
</style>