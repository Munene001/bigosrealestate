import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter , createWebHistory} from 'vue-router'
import About from './Views/About.vue'
import Home from './Views/Home.vue'
import BuyorRent from './Views/BuyorRent.vue'
import Developments from './Views/Developments.vue'
import Contact from './Views/Contact.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/', name:'HOME', component:Home},
        {path: '/about', name:'ABOUT', component:About},
        {path: '/buyorrent', name:'BUY/RENT', component:BuyorRent},
        {path: '/development', name:'DEVELOPMENTS', component:Developments},
        {path: '/contact', name:'CONTACT', component:Contact}
    ]

})

createApp(App)
.use(router)
.mount('#app')

