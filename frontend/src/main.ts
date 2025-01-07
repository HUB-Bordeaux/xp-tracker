import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/png';
link.href = '/favicon.png';

document.head.appendChild(link);

createApp(App)
    .use(router)
    .mount('#app');
