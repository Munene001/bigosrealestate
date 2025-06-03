<template>
  <Headerlite />
  <div>
    <div>POST A NEW PROPERTY</div>
    <form @submit.prevent = "submitProperty" class="space-y-[10px]">
        <div>
            <label for="title">Title</label>
            <input v-model="form.title" type="text" id="title" required/>
        </div>
        <div>
            <label for="location">Location</label>
            <input v-model="form.location" type="text" id="location" required/>
        </div>
        <div>
            <label for="location_url">Location URL(Optional)</label>
            <input v-model="form.location_url" type="url" id="location_url"/>
        </div>
        <div>
            <label for="unit_type">Unit Type</label>
            <input v-model="form.unit_type" type="text" id="unit_type" required/>
        </div>
        <div>
            <label for="furnished">Furnished</label>
            <select v-model="form.furnished" id="furnished" required>
                <option value = "No">No</option>
                <option value="Yes">Yes</option>
            </select>
        </div>
        <div>
            <label for="price_ksh">Price (KSH)</label>
            <input v-model.number = "form.price_ksh" type="number" id="price_ksh" step="0.01" required/>
        </div>
        
        <div>
            <label for="bedroom_count">Bedrooms Count</label>
            <input v-model.number = "form.bedroom_count" type="number" id="bedroom_count"  required/>
        </div>
        <div>
            <label for="bathroom_count">Bathroom Count</label>
            <input v-model.number = "form.bathroom_count" type="number" id="bathroom_count"  required/>
        </div>
        <div>
            <label for="garage_count">Garage Count</label>
            <input v-model.number = "form.garage_count" type="number" id="garage_count"  required/>
        </div>
        <div>
            <label for="description">Description</label>
            <textarea v-model="form.description"  id="description" required></textarea>
        </div>
        <div>
            <label for="features">Features</label>
            <textarea v-model="form.features"  id="features" required></textarea>
        </div>
        <div>
            <label for="amenities">Amenities</label>
            <textarea v-model="form.amenities"  id="amenities" required></textarea>
        </div>
        <button type="submit">{{ loading?'Submitting...':'Submit Property' }}</button>


    </form>
    <div v-if="message "> {{ message }}</div>
  </div>
</template>
<script setup lang="ts">
import Headerlite from '../components/Headerlite.vue';
import axios from 'axios';
import {ref} from 'vue'

interface PropertyForm {
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

const loading = ref(false);
const message = ref('');
const error = ref(false);

const submitProperty = async () => {
  loading.value = true;
  message.value = '';
  error.value = false;

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/properties', form.value, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    message.value = response.data.message;
    error.value = false;
    form.value = {
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
    };
  } catch (err: any) {
    error.value = true;
    message.value = err.response?.data?.message || 'Failed to post property';
  } finally {
    loading.value = false;
  }
};
</script>
