<template>
  <div class="flex flex-row">
  <Headerlite />
  <div class="p-[10px]">
  <div class="text-orange-900 font-bold">LISTINGS</div>
  <div v-if = "loading">Loading....</div>
  <div v-else-if = "error" class="text-red-500">{{ error }}</div>
  <div v-else-if="properties.length === 0">No properties found</div>
  <div v-else class="flex flex-col gap-[15px]">
    <div v-if="!loading && !error" class="text-[35px] leading-[45px] font-bold  text-orange-500">
          {{ count }}  Apartments
    </div>
    <div v-for= "property in properties" :key="property.id"  class="md:grid md:grid-cols-6  justify-between items-center border border-gray p-[4px]">
      <div v-if="property.images && property.images.length > 0" class="mt-2">
          <img 
            :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url" 
            :alt="property.title"
            class=" w-[70px] h-[70px] object-cover"
          >
        </div>
        <div class="font-[Sans-serif]">{{ property.title }}</div>
        <div class="hidden md:block font-[Sans-serif] ">{{ property.location }}</div>
        <div class="hidden md:block font-[Sans-serif]">{{ property.listing_type }}</div>
        <div class="hidden md:block font-[Sans-serif]">{{ new Date(property.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour:'2-digit', minute:'2-digit', hour12:true }) }}</div>
        <div class="flex flex-col gap-[6px] ">
            <button class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium" @click = editProperty(property.id)>Edit</button>
            <button class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium" @click="deleteProperty(property.id)">Delete</button>
        </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import Headerlite from "../components/Headerlite.vue";
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
  listing_type: "for sale"|"for rent"
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
const fetchProperties = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get<ApiResponse>(`https://bigosrealestate.com/api/public/index.php/api/properties`, {
      params:{
        with_images:true
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
const editProperty = (id: number) => {
  router.push(`editproperty/${id}`);
};
const deleteProperty = async (id: number) => {
  if (!confirm("Are you sure you want to delete this property?")) return;
  loading.value = true;
  error.value = "";
  try {
    await axios.delete(`https://bigosrealestate.com/api/public/index.php/api/properties/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    properties.value = properties.value.filter(
      (property) => property.id !== id
    );
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to delete property";
  } finally {
    loading.value = false;
  }
};
fetchProperties();
</script>
