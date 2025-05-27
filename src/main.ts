import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter , createWebHistory} from 'vue-router'
import About from './Views/About.vue'
import Home from './Views/Home.vue'
import BuyorRent from './Views/BuyorRent.vue'
import Developments from './Views/Developments.vue'
import Contact from './Views/Contact.vue'
import Buy from './Views/Buy.vue'
import Rent from './Views/Rent.vue'
import { Icon } from "@iconify/vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/', name:'HOME', component:Home},
        {path: '/about', name:'ABOUT', component:About},
        {path: '/buyorrent', name:'BUY/RENT', component:BuyorRent, children: [{path:'buy', name:'BUY', component:Buy},{path:'rent', name:'RENT', component:Rent}]},
        {path: '/development', name:'DEVELOPMENTS', component:Developments},
        {path: '/contact', name:'CONTACT', component:Contact}
    ]

})

createApp(App)
.component('Icon', Icon)
.use(router)
.mount('#app')

