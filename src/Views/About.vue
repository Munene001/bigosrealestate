
<script setup>
import { Icon } from '@iconify/vue';
import Mission from '../components/Mission.vue';
import Upperfoot from '../components/Upperfoot.vue';
</script>
<template>
    
    <div class="px-[25px] py-[10px] h-[220px]  justify-center  text-[#242d2d] flex flex-col gap-[18px]">
        <div class="flex flex-row"><Icon icon = "mage:home"/><Icon icon = "lsicon:right-filled" /><span class="align-middle font-light">About us</span></div>
        <div class="flex flex-col gap-[10px]">
        <div class="font-[Montserrat] text-[40px] leading-[60px] font-bold">ABOUT US</div>
        <div class = "text-[16px] leading-[18px] font-medium">Find out about our history ,our staff and our services</div>
        </div>
    </div>
    <div class="w-full py-[20px]">
<div class="grid grid-flow-row gap-[30px] place-items-center md:grid-cols-3 md:px-[20px]">
<Mission title = "Our Mission" description = "To deliver exceptional, trustworthy, and innovative real estate solutions while building lasting partnerships across Kenya and beyond, ensuring every client experiences personalized service marked by integrity, professionalism, and an unwavering commitment to excellence."iconName = "covid:transmission-virus-human-infected"/>
<Mission title = "Our Vision" description = "To become the leading force in personalized real estate solutions across Kenya and beyond by setting benchmarks in integrity, innovation, and service quality, creating lasting value and trusted relationships that make every client feel fundamentally empowered and connected" iconName = "ooui:vision-simulator"/>
<Mission title = "Our Goal" description = "To empower individuals and investors by connecting them with reliable, high-quality real estate opportunities, fostering trust, long-term value, and meaningful partnerships through personalized service and a deep commitment to excellence in Kenya’s dynamic property market."  iconName = "clarity:bullseye-line"/> 
</div>
</div>

<div class="bg-black px-[20px] md:px-[60px] md:py-[75px] box-border text-[#E0DFD9] flex flex-col gap-[40px] py-[60px]">
    <div class=" font-[Montserrat] text-[24px] font-bold leading-[26px] text-center md:text-[32px] md:leading-[35px]">Founded in the year 2025, our firm pioneers smart, client-first real estate solutions, blending local insight with modern innovation to transform property experiences across Kenya and beyond.</div>
    <div class="w-full flex flex-col gap-[35px] md:flex-row" >
    <div class="text-[17px] font-[Montserrat] font-medium leading-[25px] ">
        <p>The company was founded with Kenya’s spirit at its heart, drawing inspiration from the country’s dynamic growth and cultural richness. With years of professional experience in property development, we are committed to shaping Kenya’s real estate landscape through innovative design, responsible development, and strategic market insight. Our foundation is built on the understanding of local needs and the belief that real estate is not just about buildings, but about creating meaningful spaces where people thrive.</p> <br>
        <p>We provide the Kenyan market with a unique blend of modern architecture, strong ethical values, and personalized service. Our vision for excellence is guided by a client-first approach, where integrity, trust, and consistent delivery are key pillars. Through our lifestyle-driven developments, we aim to raise living standards and deliver lasting value for homeowners, investors, and communities across Kenya. Our reputation is rooted in reliability, timely execution, and a deep understanding of the real estate cycle within the Kenyan context.</p> <br>
        <p>“Today, we confidently tell our clients to expect more,” says the CEO. “Our team brings together years of combined expertise, and we’ve already delivered hundreds of high-quality homes to satisfied clients across the country.” As a proudly Kenyan brand, we remain committed to long-term impact and responsible growth, ensuring each project reflects our dedication to quality, client satisfaction, and a shared vision for the future of real estate in Kenya.</p>
    </div>
    <img src="/Homefont.jpg" alt="building" class="h-[410px] w-[full] object-cover "/>
    </div>
   
</div>


</template>