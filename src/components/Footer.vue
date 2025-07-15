<template>
  <div class="bg-[#130e0e]  flex flex-col  text-white px-[20px] gap-[40px] py-[30px] md:py-[70px] md:items-center md:flex md:flex-row  md:pl-[20px]" id="footer"> 

      <div class="flex flex-col gap-[15px] flex-1">
      <div class="flex flex-row items-center gap-[10px] ">
          <img src = "/Qr.png" alt="logo" class="object-scale-down h-[50px] w-[50px]">
           <div class="text-[20px] font-semibold leading-[24px]">Bigos Realestate</div>
            
      </div>
        <div class="text-[Sans serif]  text-[16px] leading-[26px] font-[300]">Live where Nairobi grows. Bigos Realestate offers premium apartments in the city’s most dynamic neighborhoods—waterfront views, urban convenience, and a future-proof address.</div>
      </div>

      <div class="flex flex-col gap-[15px] flex-1" id="contact">
          <div class="text-[20px] font-semibold leading-[24px]">Contact Us</div>
          <div class="flex flex-col gap-[5px] text-[Sans-serif]  text-[16px] leading-[26px] font-[300]">
              <div class="flex flex-row gap-[10px]"> <span class="font-[500]">Email:</span>  <span>info@example.info.com</span></div>
              <div class="flex flex-row gap-[10px]"><span class="font-[500]">Contact:</span> <span>+254712345678</span></div>
              <div class="flex flex-row gap-[10px]"><span class="font-[500]">Address:</span>  <span>Yaya center,  4th flour Kilimani, Nairobi </span></div>





          </div>
      </div>
      <div class="flex flex-col gap-[15px]">
          <div class="text-[20px] font-semibold  flex-1 leading-[24px]">Quick Links</div>
          <div class="flex flex-col  gap-[5px] text-[Sans serif]  text-[16px] leading-[26px] font-[300]">
            <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link :to="{ path: '/dashboard', hash: '#dashboard'}"   @click.native="scrollAfterNavigation">Dashboard</router-link>
            
          </div>

      </div>
      <div class="flex flex-col flex-1 gap-[15px] md:items-center">
          <div class="text-[20px] font-semibold leading-[24px]">Support</div>
          <div class="flex flex-col  gap-[5px] text-[Sans serif]  text-[16px] leading-[26px] font-[300]">
             <router-link to ="/">Home</router-link>
              <router-link to="/buyorrent/buy">For Sale</router-link>
                <router-link to="/buyorrent/rent">For Rent</router-link>
                <router-link to="/contact">Reach Us</router-link>
                
          </div>

      </div>
      
      
  </div>
  <div class="h-[65px] bg-[#130e0e] text-white text-center flex items-center justify-center border-t border-gray-600"> @Copyright Name of company. All rights reserved</div>
</template>
<script setup>
import Header from './Header.vue';
const scrollTo = Header.methods.scrollTo;
const scrollAfterNavigation = () => {
  nextTick(() => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' // or 'center', 'end', 'nearest'
      });
    }
  });
};
</script>
