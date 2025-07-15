<script>
import Contactcrown from "../components/Contactcrown.vue";
import Upperfoot from "../components/Upperfoot.vue";

export default {
  components: {
    Contactcrown,
    Upperfoot,
  },
};
</script>
<template>
  <Contactcrown />
 
  <div class="flex w-[full] flex-col bg-[#f4f3f1] items-center justify-center py-[40px] md:w-[700] box-border" id="form">
    <div
      class=" w-[85%] flex flex-col px-[10px] py-[20px]  rounded-md shadow-2xl bg-white md:w-[700px] md:border md:border-black text-center md:p-[10px] gap-[28px]"
    >
    <div class="flex flex-col gap-[8px]">
      <div class=" text-[24px] leading-[31px] font-semibold">
        Inquire from us
      </div>
      <div class = "md:text-[20px] leading-[20px] md:leading-[20px] text-[19px] md:font-medium font-[Bodoni] text-[#424138]">
        For any question regarding our properties or Accommodation leave a
        comment below and we will contact you
      </div>
      </div>
      <div>
        <form class="grid  items-center justify-center">
          <label class="flex items-start md:text-[17px] leading-[25px] text-[16px] font-medium md:font-semibold  ">Name</label>
          <input
            class="md:w-[400px] h-[42px] border border-black mb-[15px] mt-[1px] p-[4px] box-border"
            type="text"
            placeholder=""
          />
          <label class="flex items-start md:text-[17px] font-medium leading-[25px] text-[16px] md:ont-semibold  p-[4px] box-border">Phone Number</label>
          <input
            class="md:w-[400px] h-[42px] border border-black mb-[15px]  mt-[1px] p-[4px]"
            type="phone"
            placeholder=""
          />
          <label class="flex items-start md:text-[17px] text-[16px] leading-[25px] font-medium md:font-semibold p-[4px] box-border">Email</label>
          <input
            class="md:w-[400px] h-[42px] border border-black mb-[15px]  mt-[1px] p-[4px]"
            type="email"
            placeholder=""
          />
          <label class="flex items-start md:text-[17px] leading-[25px] text-[16px] font-medium md:font-semibold   mt-[1px] p-[4px] box-border">Message</label>
          <textarea class="md:w-[400px] h-[102px] border border-black mb-[15px]  mt-[1px] p-[4px] box-border "></textarea>
          <button class=" block  bg-orange-500  w-[50%] h-[38px] mx-auto hover:bg-transparent border-2 border-black-500;" >Submit</button>
        </form>
      </div>
    </div>
  </div>
 
  <div>
    <iframe
      title="BIGOS REALESTATE"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.1323030037765!2d36.791776573848246!3d-1.288768098698983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10bb1f9d8fe9%3A0x9e0bf302b6b1348c!2sLenana%20Rd%2C%20Nairobi!5e1!3m2!1sen!2ske!4v1748427147600!5m2!1sen!2ske"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <Upperfoot />
  
</template>
