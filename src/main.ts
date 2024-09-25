import './assets/main.css';
import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initElements } from './components';
import App from './App.vue';
import router from './router';

const app = createApp(App);
initElements(app);
app.use(createPinia());
app.use(router);

app.mount('#app');
