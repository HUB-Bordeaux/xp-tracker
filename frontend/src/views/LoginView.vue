<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" v-model="username" placeholder="Enter your username"/>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" placeholder="Enter your password"/>
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from '../auth';

export default {
    name: 'LoginView',
    setup() {
        const username = ref('');
        const password = ref('');
        const loading = ref(false);
        const errorMessage = ref('');
        const router = useRouter();

        const handleLogin = async () => {
            loading.value = true;
            errorMessage.value = '';

            try {
                const response = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Invalid credentials');
                }

                auth.isAuthenticated = true;
                router.push({ name: 'home' });
            } catch (error: any) {
                errorMessage.value = error.message || 'An error occurred during login';
            } finally {
                loading.value = false;
            }
        };

        return {
            username,
            password,
            handleLogin,
            loading,
            errorMessage,
        }
    },
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 5px;
}

.input-error {
    border-color: red;
}

.error {
    color: red;
    font-size: 12px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #369e70;
}
</style>
