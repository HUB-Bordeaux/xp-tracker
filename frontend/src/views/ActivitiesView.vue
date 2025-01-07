<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Activity } from '@/interfaces/Activities';
import Cookies from 'js-cookie';
import ModuleFilter from '@/components/ModuleFilter.vue';
import SearchBar from '@/components/SearchBar.vue';

export default defineComponent({
    name: 'ActivitiesView',
    components: {
        ModuleFilter,
        SearchBar,
    },
    setup() {
        const showForm = ref(false);
        const alertMessage = ref('');
        const activities = ref<Activity[]>([]);
        const searchQuery = ref<string>('');
        const selectedModules = ref<string[]>([]);
        const formData = ref({
            name: '',
            xpOrganisation: '',
            xpParticipation: '',
            category: '',
        })

        const availableModules = ['usergroup', 'freeproject', 'talk', 'hackathon'];
        const filteredActivities = computed(() => 
            activities.value.filter(activity =>
                (selectedModules.value.length === 0 ||
                selectedModules.value.includes(activity.category)) &&
                `${activity.name}`.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        )
        const toggleModule = (module: string) => {
            if (selectedModules.value.includes(module)) {
                selectedModules.value = selectedModules.value.filter(m => m !== module);
            } else {
                selectedModules.value.push(module);
            }
            console.log(selectedModules);
            console.log(activities.value);
        }

        const toggleForm = () => {
            showForm.value = !showForm.value;
        }

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
                    id: activity.id,
                    name: activity.name,
                    xpOrganisation: activity.xpOrganisation,
                    xpParticipation: activity.xpParticipation,
                    category: activity.category,
                }));
            } catch (error) {
                console.error('Failed to fetch activities: ', error);
                alert(`Error: ${error}`);
            }
        }
        fetchActivities();

        const uploadActivity = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                alert('Authorization token not found. Please log in again.');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/activities', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: formData.value.name,
                        xpOrganisation: formData.value.xpOrganisation,
                        xpParticipation: formData.value.xpParticipation,
                        category: formData.value.category,
                        students: [],
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                alertMessage.value = `Activity ${formData.value.name} uploaded successfully!`;
                toggleForm();
                await fetchActivities();
            } catch (error) {
                console.error('Failed to upload activity: ', error);
                alertMessage.value = `Error: ${error}`;
            }

            setTimeout(() => {
                alertMessage.value = '';
            }, 3000);
        };

        return {
            activities,
            searchQuery,
            selectedModules,
            availableModules,
            toggleModule,
            filteredActivities,
            uploadActivity,
            alertMessage,
            toggleForm,
            showForm,
            formData,
        };
    },
})
</script>

<template>
    <div class="activities">
        <h1>Activities list</h1>

        <ModuleFilter
            :availableModules="availableModules"
            :selectedModules="selectedModules"
            :toggleModule="toggleModule"
        />

        <button class="add-activity-button" @click="toggleForm">+ Add Activity</button>

        <SearchBar
            :searchQuery="searchQuery"
            @update:searchQuery="searchQuery = $event"
        />

        <div v-if="alertMessage" class="alert">{{ alertMessage }}</div>

        <div v-if="showForm" class="activity-form">
            <h2>Add a New Activity</h2>
            <input v-model="formData.name" type="text" placeholder="Name" />
            <input v-model="formData.xpOrganisation" type="number" placeholder="XP Organisation" />
            <input v-model="formData.xpParticipation" type="number" placeholder="XP Participation" />
            <label for="category-select">Select a category:</label>
            <select v-model="formData.category" id="category-select">
                <option v-for="category in availableModules" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
            <button @click="uploadActivity">Submit</button>
        </div>

        <div class="activities-list">
            <ActivityCard
                v-for="activity in filteredActivities"
                :key="activity.id"
                :activity="activity"
            >
                <template #footer>
                    <router-link
                        :to="{ name: 'activity', params: {id: activity.id } }"
                        class="activity-card-button"
                    >
                        View Activity
                    </router-link>
                </template>
            </ActivityCard>
        </div>
    </div>
</template>

<style scoped>
.activities {
    text-align: center;
    padding: 1.25rem;
}

.activities-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.activity-card-button {
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.625rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.activity-card-button:hover {
    background-color: #0056b3;
}

.activity-form {
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

.activity-form input {
    display: block;
    margin: 0.5rem auto;
    padding: 0.5rem;
    width: 90%;
}

.add-activity-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.add-activity-button:hover {
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