import { reactive } from "vue";
import Cookies from "js-cookie";

export const authState = reactive({
    isAuth: false,
    token: null as string | null,

    checkAuth() {
        const token = Cookies.get('authToken');
        if (token) {
            this.isAuth = true;
            this.token = token;
        } else {
            this.isAuth = false;
            this.token = null;
        }
    },

    login(token: string) {
        Cookies.set('authToken', token, { expires: 2 / 24 }); // 2 heures
        this.isAuth = true;
        this.token = token;
    },

    logout() {
        Cookies.remove('authToken');
        this.isAuth = false;
        this.token = null;
    },
});

authState.checkAuth();
