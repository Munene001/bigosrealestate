<template>
    <Headerlite />
    <div class="p-[10px] box-border flex flex-col gap-[10px] border-b border-black">
      <div class="text-orange-900 font-bold">EDIT PROPERTY</div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <form v-else @submit.prevent="submitProperty" class="flex flex-col gap-[40px] md:gap-[25px]">
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="title">Title:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model="form.title" type="text" id="title" placeholder="Use Capital letters" required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="location">Location:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model="form.location" type="text" id="location" placeholder="Format example: Kilimani,Nairobi" required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="location_url">Location URL (Optional):</label>
          <input class="border border-black h-[42px] p-[8px]" v-model="form.location_url" type="url" id="location_url" />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="unit_type">Unit Type:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model="form.unit_type" type="text" id="unit_type" placeholder="example: 2 bedroom, 1 bedroom, bungallow, Mansionatte" required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="furnished">Furnished:</label>
          <select class="border border-black h-[42px] p-[8px]" v-model="form.furnished" id="furnished" required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="price_ksh">Price (KSH):</label>
          <input class="border border-black h-[42px] p-[8px]" v-model.number="form.price_ksh" type="number" id="price_ksh" required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="bedroom_count">Bedrooms Count:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model.number="form.bedroom_count" type="number" id="bedroom_count" @wheel.prevent required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="bathroom_count">Bathroom Count:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model.number="form.bathroom_count" type="number" id="bathroom_count"  @wheel.prevent required />
        </div>
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900"  for="garage_count">Garage Count:</label>
          <input class="border border-black h-[42px] p-[8px]" v-model.number="form.garage_count" type="number" id="garage_count" @wheel.prevent required />
        </div>
        <div class="flex flex-col gap-[17px]">
          <div class="flex flex-col gap-[5px]">
            <label class="text-orange-900"  for="description">Description:</label>
            <textarea class="border border-black w-full h-[250px] p-[8px]" v-model="form.description" id="description" placeholder="A brief description, do not exceed 200 words, follow paragraph rules"></textarea>
          </div>
          <div class="flex flex-col gap-[5px]">
            <label class="text-orange-900"  for="features">Features:</label>
            <textarea class="border border-black w-full h-[250px] p-[8px]" v-model="form.features" id="features" placeholder="Go to new line after every bullet point, Entails details like tiled floors, open planned kitchen, nice doors."></textarea>
          </div>
          <div class="flex flex-col gap-[5px]">
            <label class="text-orange-900"  for="amenities">Amenities:</label>
            <textarea class="border border-black w-full h-[250px] p-[8px]" v-model="form.amenities" id="amenities" placeholder="Go to newline after every bullet point, Entails details like: gym, ample parking," required></textarea>
          </div>
        </div>
        <button class="block bg-orange-500 w-[50%] h-[38px] mx-auto hover:bg-transparent border-2 border-black-500" type="submit">{{ submitting ? 'Updating...' : 'Update Property' }}</button>
        <div class="block mx-auto" :class="{ 'text-green-500': !error, 'text-red-500': error }" v-if="message">{{ message }}</div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import Headerlite from '../components/Headerlite.vue';
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  interface PropertyForm {
    id: number;
    title: string;
    location: string;
    location_url: string | null;
    unit_type: string;
    furnished: 'Yes' | 'No';
    price_ksh: number;
    bedroom_count: number;
    bathroom_count: number;
    garage_count: number;
    description: string;
    features: string;
    amenities: string;
  }
  
  const form = ref<PropertyForm>({
    id: 0,
    title: '',
    location: '',
    location_url: null,
    unit_type: '',
    furnished: 'No',
    price_ksh: 0,
    bedroom_count: 0,
    bathroom_count: 0,
    garage_count: 0,
    description: '',
    features: '',
    amenities: '',
  });
  
  const loading = ref(true);
  const submitting = ref(false);
  const error = ref('');
  const message = ref('');
  
  const route = useRoute();
  const router = useRouter();
  
  const fetchProperty = async () => {
    const id = route.params.id as string;
    loading.value = true;
    error.value = '';
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      form.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch property';
    } finally {
      loading.value = false;
    }
  };
  
  const submitProperty = async () => {
    submitting.value = true;
    message.value = '';
    error.value = '';
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/properties/${form.value.id}`, form.value, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      message.value = response.data.message || 'Property updated successfully';
      setTimeout(() => {
        message.value = '';
        router.push('/listings');
      }, 3000);
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update property';
      setTimeout(() => {
        error.value = '';
      }, 3000);
    } finally {
      submitting.value = false;
    }
  };
  
  fetchProperty();
  </script>