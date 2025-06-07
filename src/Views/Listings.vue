<template>
  <Headerlite />
  <div>
  <div class="text-orange-900 font-bold">LISTINGS</div>
  <div v-if = "loading">Loading....</div>
  <div v-else-if = "error" class="text-red-500">{{ error }}</div>
  <div v-else-if="properties.length === 0">No properties found</div>
  <div v-else class="flex flex-col gap-[15px]">
    <div v-for= "property in properties" :key="property.id" >
      <div v-if="property.images && property.images.length > 0" class="mt-2">
          <img 
            :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url" 
            :alt="property.title"
            class="w-64 h-48 object-cover"
          >
        </div>
        <div>{{ property.title }}</div>
        <div>{{ property.location }}</div>
        <div>{{ property.unit_type }}</div>
        <div>
            <button @click = editProperty(property.id)>Edit</button>
            <button @click="deleteProperty(property.id)">Delete</button>
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
  images:Image[];
}

const properties = ref<Property[]>([]);
const loading = ref(true);
const error = ref("");

const router = useRouter();
const fetchProperties = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/properties`, {
      params:{
        with_images:true
      },
      headers: {
        Accept: "application/json",
      },
    });
    properties.value = response.data;
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
    await axios.delete(`http://127.0.0.1:8000/api/properties/${id}`, {
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
