import './assets/css/main.css';
import './assets/css/base.css';
import './assets/js/iconfont.js'

import { createApp } from 'vue';
import pinia  from './stores/index';
import { initElements, initComponents } from './components';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(pinia);
app.use(router);
initElements(app);
initComponents(app);

app.mount('#app');