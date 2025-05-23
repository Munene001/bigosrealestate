import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter , createWebHistory} from 'vue-router'
import About from './Views/About.vue'
import Home from './Views/Home.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/', name:'Home', component:Home},
        {path: '/about', name:'About', component:About}
    ]

})

createApp(App)
.use(router)
.mount('#app')

