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
    data() {
        return {//+
            imageType: 'png',
        };
    },
    methods: {
        defaultAction() {
        },
    },
});
</script>

<template>
    <div class="student-card">
        <div class="student-card-header">
            <img
                :src="student.image ? `data:image/${imageType};base64,${student.image}` : '/studentIcon.png'"
                alt="Student Image"
                class="student-image"
            />
            <h3 class="student-name">{{ student.firstname }} {{ student.lastname }}</h3>
        </div>
        <div class="student-card-body">
            <p><strong>Promo:</strong> {{ student.promo }}</p>
        </div>
        <div class="student-card-footer">
            <slot name="footer">
                <button @click="defaultAction">View Profile</button>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.student-card {
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 1rem 0;
    background-color: #fff;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.student-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
}

.student-name {
    margin-top: 0.3125rem;
}

.student-image {
    width: 6.25rem;
    height: 6.25rem;
    object-fit: cover;
    border-radius: 50%;
}

.student-card-body {
    font-size: 1.25rem;
    text-align: center;
    margin-top: -1.25rem;
}

.student-card-footer {
    text-align: center;
}
</style>
