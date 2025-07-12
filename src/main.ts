import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter , createWebHistory} from 'vue-router'
import About from './Views/About.vue'
import Home from './Views/Home.vue'
import Blog from './Views/Blog.vue'
import Contact from './Views/Contact.vue'
import Buy from './Views/Buy.vue'
import Rent from './Views/Rent.vue'
import Dashboard from './Views/Dashboard.vue'
import Listings from './Views/Listings.vue'
import Editproperty from './Views/Editproperty.vue'
import Details from './Views/Details.vue'
import { Icon } from "@iconify/vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/', name:'HOME', component:Home},
        {path: '/about', name:'ABOUT', component:About},
        {path: '/buyorrent', name:'BUY/RENT', children: [{path:'buy', name:'BUY', component:Buy},{path:'rent', name:'RENT', component:Rent}]},
        {path: '/blog', name:'BLOGS', component:Blog},
        {path: '/contact', name:'CONTACT', component:Contact},
        {path: '/dashboard', name:'DASHBOARD',component:Dashboard},
        {path:'/listings',name:'LISTINGS',component:Listings},
        {path:'/editproperty/:id', name: 'EDITPROPERTY', component:Editproperty},
        {path:'/buyorrent/details/:id', name: 'DETAILS', component:Details}


    ],
   

});

createApp(App)
.component('Icon', Icon)
.use(router)
.mount('#app')

