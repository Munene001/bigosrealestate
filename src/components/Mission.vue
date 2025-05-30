<template>
    <div class=" flex flex-col gap-[20px] w-[87%] h-[300px] border border-gray-500   p-[20px] md:w-[100%]">
        <Icon :icon = "iconName" style = "font-size: 64px !important; color:#3C3B32"/>
        <div class="font-[Montserrat] text-[24px] font-bold leading-[26px] text-[#242d2d]">{{ title }}</div>
        <div class="font-[Montserrat] text-[17px] leading-[25px] text-[#3C3B32]">{{ description }}</div>

    </div>

    </template>
    <script setup>
     defineProps({
        title:String,
        description: String,
        iconName:String

    })
    </script>