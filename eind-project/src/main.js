import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import {store} from './store.js'
import { createApp } from 'vue'
import App from './App.vue'


createApp(App).use(bootstrap).use(store).mount('#app')