import { reactive } from "vue";

const auth = reactive({
    isAuthenticated: localStorage.getItem('auth') === 'true',
});

export const login = () => {
    auth.isAuthenticated = true;
    localStorage.setItem('auth', 'true');
};

export const logout = () => {
    auth.isAuthenticated = false;
    localStorage.setItem('auth', 'false');
};

export default auth;