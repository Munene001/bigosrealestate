<template>
  <div class="h-[87px] flex-row md:flex hidden w-full bg-[#130e0e]">
    <div class="flex w-[18%] items-center justify-center">Hello</div>
    <div class="w-[82%] flex items-center justify-around bg-transparent">
      <router-link
        class="text-[14px] leading-[14px] text-white font-semibold no-underline font-montserrat"
        to="/"
      >
        HOME
      </router-link>

      <div>
        <button
          @click="toggleDiv"
          class="flex flex-row  gap-[2px] text-[14px]  text-white leading-[14px] font-semibold no-underline font-montserrat"
        >
          BUY/RENT<Icon icon = "ant-design:down-outlined"/>
        </button>
        <div
          v-if="isVisible"
          class="flex flex-col bg-[#130e0e] pb-[3px] z-50 gap-2 text-sm pl-2 absolute w-[150px] mt-[10px]"
        >
          <router-link
            to="/buyorrent/buy"
            class="border-b-2 border-black hover:bg-orange-600 items-center  text-white px-[5px] box-border"
            >FOR SALE</router-link
          >
          <router-link to="/buyorrent/rent" class="hover:bg-orange-600 items-center  text-white px-[5px] box-border"
            >FOR RENT</router-link
          >
        </div>
      </div>

      <router-link
        class="text-[14px] leading-[14px] font-semibold no-underline font-montserrat  text-white"
        to="/about"
      >
        ABOUT US
      </router-link>
      <router-link
        class="text-[14px] leading-[14px] font-semibold no-underline font-montserrat  text-white"
        to="/development"
      >
        DEVELOPMENTS
      </router-link>
      <router-link
        class="text-[14px] leading-[14px] font-semibold no-underline font-montserrat  text-white"
        to="/contact"
      >
        CONTACT
      </router-link>

      <div class="flex flex-row gap-3 items-center">
        <Icon
          icon="carbon:phone-voice"
          style="color:#F97316; font-size: 20px"
        />
        <div class=" text-white">0726551880</div>
      </div>
    </div>
  </div>


  
  <div
    class="flex flex-row max-w-[768px] md:hidden h-[80px] justify-between items-center px-4 box-border bg-[#130e0e] w-full"
  >
    <div>logo</div>
    <button @click="togglePopup">
      <Icon icon="material-symbols:menu" style="font-size: 28px; color:white" />
    </button>
  </div>
  <div
    v-if="isOpen"
    class="fixed top-0 right-0 flex flex-row w-[90%] h-[100vh] z-50 bg-white px-[40px] pt-[100px]"
  >
  <div class="flex flex-col gap-[3px]">
    <router-link
        class=" flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline font-montserrat border-b border-gray-400 items-center"
        to="/"
        @click="togglePopup"
      >
        HOME
      </router-link>

      <div>
        <button
          @click="toggleDiv"
          class="h-[55px] flex flex-row  gap-[2px] text-[18px] leading-[18px] font-semibold no-underline font-montserrat  border-b border-gray-400 items-center"
        >
          BUY/RENT<Icon icon = "ant-design:down-outlined"/>
        </button>
        <div
          v-if="isVisible"
          class="flex flex-col gap-2 text-sm pl-2  w-[150px]"
        >
          <router-link
            to="/buyorrent/buy"
            class=" flex h-[45px]  border-b border-gray-400 items-center" @click="togglePopup"
            >FOR SALE</router-link
          >
          <router-link to="/buyorrent/rent" class=" flex h-[45px] border-b border-gray-400 items-center" @click="togglePopup"
            >FOR RENT</router-link
          >
        </div>
      </div>

      <router-link @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline font-montserrat  border-b border-gray-400 items-center"
        to="/about"
      >
        ABOUT US
      </router-link>
      <router-link @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline font-montserrat  border-b border-gray-400 items-center"
        to="/development"
      >
        DEVELOPMENTS
      </router-link>
      <router-link @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline font-montserrat  border-b border-gray-400 items-center"
        to="/contact"
      >
        CONTACT
      </router-link>
  </div>
    <button @click="togglePopup" class="absolute top-[60px] right-[30px]"><Icon icon="zondicons:close" style="font-size: 28px;"/></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      isOpen: false,
    };
  },
  methods: {
    toggleDiv() {
      this.isVisible = !this.isVisible;
    },
    togglePopup() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
