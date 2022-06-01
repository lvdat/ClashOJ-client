import { createApp } from 'vue'
import TestAPI from './TestAPI.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(TestAPI)
app.use(VueAxios, axios)
app.mount('#app')
