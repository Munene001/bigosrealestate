<template>
  <div
    class="w-[87%] h-[250px] px-[20px] box-border flex flex-col gap-[20px] bg-black rounded-md md:w-[100%] md:rounded-none items-center justify-center text-center border border-transparent hover:border-orange-500 transition duration-300 shadow-xl"
  >
    <Icon :icon="iconName" style="color: #f97316; font-size: 35px" />
    <div class="flex flex-col gap-[8px]">
      <div
        class="font-[Jost-Regular] text-[20px] font-semibold leading-[22px] text-white"
      >
        {{ title }}
      </div>
      <div
        class="font-[Jost-Regular] text-[16px] font-medium leading-[22px] text-white"
      >
        {{ description }}
      </div>
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
