<template>
  <div
    class="flex flex-col gap-[20px] w-[87%] h-[300px] border border-gray-500 p-[20px] md:w-[100%]"
  >
    <Icon :icon="iconName" style="font-size: 64px !important; color: #f97316" />
    <div class=" text-[24px] font-bold leading-[26px]">
      {{ title }}
    </div>
    <div class="font-[Sans-serif] text-[17px] leading-[25px] text-[#3C3B32]">
      {{ description }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  description: String,
  iconName: String,
});
</script>
