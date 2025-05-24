<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

</script>

<template>
   <Header/>

    <router-view></router-view>
    
    <Footer/>
    
   
</template>


