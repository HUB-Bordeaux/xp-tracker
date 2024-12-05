import { reactive } from "vue";

export const authState = reactive({
    isAuth: localStorage.getItem('authToken') !== null,
    token: localStorage.getItem('authToken'),
    login(token: string) {
        localStorage.setItem('authToken', token);
        this.isAuth = true;
    },
    logout() {
        localStorage.removeItem('authToken');
        this.isAuth = false;
    },
});