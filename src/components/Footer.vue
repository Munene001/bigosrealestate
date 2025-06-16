<template>
  <div class="flex-col md:flex hidden bg-[#130e0e] font-[Sans-serif]">
    <div class="h-[215px] grid grid-cols-3 place-items-center text-center">
      <div class="flex- flex-col gap-[20px]">
        <div class="text-[20px] font-normal leading-[32px] text-white mb-[8px]">
          BIGOS REAL ESTATE
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          Kilimani Mullholland drive
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          Nairobi
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          Info@bigosrealestate
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          0726551880
        </div>
      </div>
      <div class="flex- flex-col gap-[20px]">
        <div class="text-[20px] font-normal leading-[32px] text-white mb-[8px]">
          COMPANY
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          About US
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          Services
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          Contact
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          News
        </div>
      </div>
      <div class="flex- flex-col gap-[20px]">
        <div class="text-[20px] font-normal leading-[32px] text-white mb-[8px]">
          EXPLORE
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          FOR SALE
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          FOR RENT
        </div>
        <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
          NEWS
        </div>
        <router-link
          to="/dashboard"
          class="text-[16px] font-normal leading-[25px] text-[#f97316]"
          >DASHBOARD</router-link
        >
      </div>
    </div>
    <div class="flex flex-row justify-center mb-[30px] gap-[4px]">
      <Icon icon="mdi:linkedin" style="color: white" />
      <Icon icon="mdi:facebook" style="color: white" />
      <Icon icon="mdi:instagram" style="color: white" />
    </div>
    <div
      class="h-[40px] text-white flex flex-row align-middle justify-center text-[Opne Sans] text-[16px] leading-[21px]"
    >
      Copyright <Icon icon="solar:copyright-line-duotone" /> BIGOS REAL ESTATE
    </div>
  </div>

  <div class="flex flex-col md:hidden bg-[#130e0e] px-[10px] py-[20px] font-[Sans-serif]">
    <div class=" flex flex-col gap-[20px]">
      <div class="h-[215px] grid grid-cols-2 gap-[30px]">
        <div class="flex- flex-col gap-[20px]">
          <div
            class="text-[20px] font-normal leading-[32px] text-white mb-[8px]"
          >
            BIGOS REAL ESTATE
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            Kilimani Mullholland drive
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            Nairobi
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            Info@bigosrealestate
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            0726551880
          </div>
        </div>
        <div class="flex- flex-col gap-[20px]">
          <div
            class="text-[20px] font-normal leading-[32px] text-white mb-[8px]"
          >
            COMPANY
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            About US
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            Services
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            Contact
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            News
          </div>
        </div>
      </div>
      <div class="items-center justify-center">
        <div class="flex- flex-col">
          <div
            class="text-[20px] font-normal leading-[32px] text-white mb-[8px]"
          >
            EXPLORE
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            FOR SALE
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            FOR RENT
          </div>
          <div class="text-[16px] font-normal leading-[28px] text-[#f97316]">
            NEWS
          </div>
          <router-link
            to="/dashboard"
            class="text-[14px] font-normal leading-[25px] text-[#f97316]"
            >DASHBOARD</router-link
          >
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center mb-[30px] gap-[4px]">
      <Icon icon="mdi:linkedin" style="color: white" />
      <Icon icon="mdi:facebook" style="color: white" />
      <Icon icon="mdi:instagram" style="color: white" />
    </div>
    <div
      class="h-[40px] text-white flex flex-row align-middle justify-center  text-[16px] leading-[21px]"
    >
      Copyright <Icon icon="solar:copyright-line-duotone" /> BIGOS REAL ESTATE
    </div>
  </div>
</template>
