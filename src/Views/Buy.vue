<template>
    
    <div class="md:py-[25px] md:px-[25px] py-[10px] px-[10px]">
    <div v-if = "loading">Loading....</div>
    <div v-else-if = "error" class="text-red-500">{{ error }}</div>
    <div v-else-if="properties.length === 0">No properties found</div>
    <div v-else class="flex flex-col gap-[15px]">
      <router-link to="/buy" v-if="!loading && !error" class="flex flex-row"><Icon icon = "mage:home"/><Icon icon = "lsicon:right-filled" /><span class="align-middle font-light">Apartments {{ listingType? listingType:'' }}</span></router-link>
      <div v-if="!loading && !error" class="text-[35px] leading-[45px] font-bold font-[Montserrat] ">
          {{ count }}  Apartments
    </div>
    <div class="flex flex-col gap-[35px]">
      <div v-for= "property in properties" :key="property.id"  class="flex flex-col gap-[28px] border pb-[15px]  border-gray-300 w-[full]  md:flex md:flex-row">
        <div v-if="property.images && property.images.length > 0">
            <img 
              :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url" 
              :alt="property.title"
              class="h-[250px] w-[100%] md:w-[500px] md:h-[300px]  object-cover"
            >
          </div>
          <div class="flex flex-col gap-[28px] md:flex md:flex-col md:justify-center w-full md:pr-[100px] ">
          <div class="flex flex-row justify-between px-[10px] w-[full] items-center">
            <div class=" px-[7px] bg-orange-500 text-[14px] md:text-[18px] leading-[28px] md:leading-[35px] font-medium text-white">construction {{ property.construction_status }}</div>
            <div class="text-[19px] md:text-[23px] leading-[32px] md:leading-[40px] font-semibold">Ksh: {{ property.price_ksh }}</div>
          </div>
          <div class="font-[Montserrat] px-[7px] text-[24px] md:text-[28px] font-semibold md:leading-[40px] leading-[32px]"><span>{{ property.title }}</span> | <span>{{ property.location }}</span> | <span>{{ property.unit_type }}</span></div>
          <div class="flex flex-row justify-between px-[7px]">
            <router-link to="/contact" class="py-[10px] md:px-[45px] px-[32px] bg-black text-orange-500 font-medium hover:bg-transparent">Contact us</router-link>
            <button @click="detailProperty(property.id)" class="py-[10px] md:px-[45px] px-[32px] bg-transparent border border-black hover:bg-orange-500">View Details</button>
          </div> 
          </div>   
      </div>
      </div>
    </div>
    </div>
  </template>
  <script setup lang="ts">
  
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  
  
  interface Image{
    id:number
    property_id:number;
    image_url:string;
    is_primary:boolean;
  }
  
  interface Property {
    id: number;
    title: string;
    location: string;
    location_url: string | null;
    unit_type: string;
    furnished: "Yes" | "No";
    price_ksh: number;
    bedroom_count: number;
    bathroom_count: number;
    garage_count: number;
    description: string;
    features: string;
    amenities: string;
    created_at: string;
    listing_type:"for sale"|"for rent"
    construction_status: 'complete'|'unfinished'
    images:Image[];
  }
  interface ApiResponse{
    properties: Property[];
    count: number;
    listing_type: string|null;

  }
  
  const properties = ref<Property[]>([]);
  const count = ref(0);
  const listingType = ref<string| null>(null);
  const loading = ref(true);
  const error = ref("");
  const router = useRouter();

  const detailProperty = (id: number) => {
    router.push(`details/${id}`);
  }
  
  
  const fetchProperties = async () => {
    loading.value = true;
    error.value = "";
    try {
      const response = await axios.get<ApiResponse>(`http://127.0.0.1:8000/api/properties`, {
        params:{
          with_images:true, listing_type :'for sale'
        },
        headers: {
          Accept: "application/json",
        },
      });
      properties.value = response.data.properties;
      count.value = response.data.count;
      listingType.value = response.data.listing_type;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch properties";
    } finally {
      loading.value = false;
    }
  };
  fetchProperties();
  </script>
  