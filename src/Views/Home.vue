<script setup>
import Bigosvalues from "../components/Bigosvalues.vue";
import Propertybuffet from "../components/Propertybuffet.vue";
import Upperfoot from "../components/Upperfoot.vue";
</script>
<template>
  <div
    class="h-[60vh] overflow-hidden bg-homerdos bg-cover bg-center bg-no-repeat relative flex items-center md:h-[80vh]"
  >
    <div class="absolute inset-0 bg-black bg-opacity-60 overflow-hidden"></div>
    <div
      class="relative z-10 text-white text-center flex flex-col items-center gap-[25px] px-[20px] box-border animate-glide-in opacity-0 md:px-[10%]"
    >
      <div
        class="font-[Sans-serif] font-bold text-[35px] leading-[38px] md:text-[89px] md:leading-[92px]"
      >
        Kenya's Hub for <span class="text-orange-500"> Real Estate </span>
      </div>
      <div
        class="font-[] font-semibold text-[18px] leading-[28px] text-[#e9e9e7]"
      >
        We bridge investors to Kenya’s real estate market with reliability,
        innovation, and personalized alliances, delivering upscale residences
        and long-term worth across Kenya.
      </div>
      <router-link
        to="/buyorrent/buy"
        class="flex flex-row gap-[5px] justify-center bg-orange-500 p-[4px] w-[40%] items-center text-black"
        >FOR SALE
        <Icon icon="solar:arrow-right-outline" style="font-size: 20px"
      /></router-link>
    </div>
  </div>
  <div
    class="bg-[rgb(31,24,24)] w-[full] flex flex-col items-center py-[60px] gap-[30px] md:px-[20px] md:py-[70px] md:gap-[40px]"
  >
    <div class="text-[40px] font-bold leading-[44px] text-white font-[Bodoni]">WHY BIGOS</div>
    <div
      class="grid grid-flow-row gap-[30px] place-items-center md:grid-cols-3"
    >
      <Bigosvalues
        title="QUALITY HOMES"
        description="We provide premium properties tailored to modern lifestyles and long-term living satisfaction."
        iconName="solar:home-outline"
      />
      <Bigosvalues
        title="TRUSTED EXPERTISE"
        description="Our team offers reliable, informed guidance backed by years of real estate experience."
        iconName="codicon:workspace-trusted"
      />
      <Bigosvalues
        title="PERSONALIZED SERVICE"
        description="We deliver tailored real estate solutions that align with your unique goals and needs."
        iconName="medical-icon:i-interpreter-services"
      />
      <Bigosvalues
        title="INNOVATIVE SOLUTIONS"
        description="We use technology and strategy to simplify real estate transactions and client communication."
        iconName="cbi:smarthome-solver"
      />
      <Bigosvalues
        title="MARKET ACCESSIBILITY"
        description="Gain access to Kenya’s finest locations through our wide-reaching, investor-friendly network."
        iconName="icon-park-outline:weixin-market"
      />
      <Bigosvalues
        title="LONG-TERM VALUE"
        description="Our listings ensure sustainable investments that grow in worth and lifestyle impact."
        iconName="ix:longer"
      />
    </div>
  </div>
  <Propertybuffet/>

</template>
