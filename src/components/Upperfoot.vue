<template>
  <div
    class="flex flex-col bg-black gap-[50px] justify-center items-center py-[40px] md:h-[355px]  md:flex md:flex-row md:px-[20px]"
  >
    <div
      class="flex text-white bg-black text-center p-[20px] box-border w-[90%] md:w-[50%] items-center justify-center flex-col gap-[20px] shadow-xl border border-gray"
    >
      <Icon
        icon="mdi:home-find-outline"
        style="font-size: 50px; color: orange"
      />
      <div class=" text-[25px] leading-[37px] text-orange-500">
        Searching for a new Home or Investment?
      </div>
      <div class="font-[bodoni] text-[18px] leading-[25px]">
        Bigos RealEstate is the ideal partner for your ideal home
      </div>
      <router-link to="buyorrent/rent" class="p-[10px] border-2 border-orange-500">
        Find one Today
      </router-link>
    </div>
    <div
      class="flex text-white w-[90%] p-[20px] box-border bg-black text-center md:w-[50%] items-center justify-center flex-col gap-[20px] shadow-xl border border-gray"
    >
      <Icon
        icon="material-symbols:flights-and-hotels-outline-rounded"
        style="font-size: 50px; color: orange"
      />
      <div
        class=" text-[25px] leading-[37px] text-orange-500"
      >
        Looking for Accommodation for your stay?
      </div>
      <div class="font-[Bodoni] text-[18px]">
        <a href="https://www.willinghost.africa/" class="text-green-500"
          >Willing host</a
        >
        got you covered
      </div>
      <Icon icon="twemoji:flag-kenya" style="font-size: 40px" />
    </div>
  </div>
</template>
