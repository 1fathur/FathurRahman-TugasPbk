// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: {},
});
app.mount('#app');
