import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store.js'


createApp(App).use(bootstrap).use(store).use(router).mount('#app')
