<script lang="ts">
import { defineComponent } from 'vue';
import { CategoryItem } from '../interfaces/Category';

export default defineComponent({
    name: 'CategoryList',
    props: {
        categories: {
            type: Array as () => Array<{ name: string; items: CategoryItem[] }>,
            required: true,
        },
        totalXP: {
            type: Function,
            required: true,
        },
    },
});
</script>

<template>
    <div class="categories">
        <div v-for="category in categories" :key="category.name" class="category">
            <h3>{{ category.name }} : {{ totalXP(category.items) }} XP</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>XP Organisation</th>
                        <th>XP Participation</th>
                        <th>Presence</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in category.items" :key="item.title">
                        <td>{{ item.title }}</td>
                        <td>{{ item.xpOrganisation }}</td>
                        <td>{{ item.xpParticipation }}</td>
                        <td>{{ item.present ? 'Present' : 'Not present' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style scoped>
.categories {
    width: 70%;
    margin: 2rem auto;
}

.category {
    margin-bottom: 2rem;
}

h3 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: #007bff;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    text-align: center;
}

th,
td {
    border: 2px solid #000;
    padding: 0.5rem;
    background-color: #ffffff;
}

th {
    background-color: #54a7ff;
    color: white;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #ffffff;
}
</style>
