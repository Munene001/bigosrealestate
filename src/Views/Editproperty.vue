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
        <div class="flex flex-col gap-[10px]">
          <label class="text-orange-900" for = "primary_image">Primary Image(<250kb)</label>
          <input type = "file" id = "primary_image" accept=" Image/jpeg, image/png, image/webp" @change ="handlePrimaryImage"/>
          <div v-if="currentPrimaryImage" class="mt-2">
        <img :src="currentPrimaryImage" class="w-64 h-48 object-cover" />
        <p class="text-sm">Current primary image</p>
      </div>
      <p v-if="primaryImage" class="text-sm">New selected: {{ primaryImage.name }}</p>
    </div>
        <div class="flex flex-col gap-[10px]">
      <label class="text-orange-900" for="gallery_images">Gallery Images (Optional, <250KB each):</label>
      <input
        type="file"
        id="gallery_images"
        accept="image/jpeg,image/png,image/webp"
        multiple
        @change="handleGalleryImages"
      />
      <div v-if="currentGalleryImages.length > 0" class="mt-2">
        <div class="flex flex-wrap gap-2">
          <div v-for="(image, index) in currentGalleryImages" :key="index" class="relative">
            <img :src="image.image_url" class="w-32 h-24 object-cover" />
            <button 
              @click.prevent="removeGalleryImage(image.id)"
              class="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs"
            >
              ×
            </button>
          </div>
        </div>
        <p class="text-sm">Current gallery images</p>
      </div>
      <p v-if="galleryImages.length" class="text-sm">New selected: {{ galleryImages.length }} images</p>
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
  
  interface Image {
    id: number;
    property_id: number;
    image_url: string;
    is_primary: boolean;
  }
  
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
    images?: Image[];
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
  const primaryImage = ref<File|null>(null);
  const galleryImages = ref<File[]>([]);
  const currentPrimaryImage = ref<string>('');
  const currentGalleryImages = ref<Image[]>([]);
  
  const route = useRoute();
  const router = useRouter();
  
  const fetchProperty = async () => {
    const id = route.params.id as string;
    loading.value = true;
    error.value = '';
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`, {
        params: {
          with_images: true
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      form.value = response.data;
      if(response.data.images){
        const primary = response.data.images.find((img: Image) => img.is_primary);
        if(primary) currentPrimaryImage.value = primary.image_url;
        currentGalleryImages.value = response.data.images.filter((img: Image) => !img.is_primary);
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch property';
    } finally {
      loading.value = false;
    }
  };
  
  const handlePrimaryImage = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files[0]){
      if(input.files[0].size > 250 * 1024){
        error.value = "Primary image must be under 250KB";
        input.value = "";
        primaryImage.value = null;
      } else {
        primaryImage.value = input.files[0];
        error.value = "";
      }
    }
  };
  
  const handleGalleryImages = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      galleryImages.value = files.filter(file => file.size <= 250 * 1024);
      if (files.length !== galleryImages.value.length) {
        error.value = "Some gallery images exceed 250KB";
      } else {
        error.value = "";
      }
    }
  };
  
  const removeGalleryImage = async (image_id: number) => {
    if(!confirm("Are you sure you want to remove this image?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/images/${image_id}`);
      currentGalleryImages.value = currentGalleryImages.value.filter(img => img.id !== image_id);
      message.value = "Image removed successfully";
      setTimeout(() => message.value = "", 3000);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to remove image";
      setTimeout(() => error.value = "", 3000);
    }
  };
  
  const submitProperty = async () => {
  submitting.value = true;
  message.value = '';
  error.value = '';
  try {
    const formData = new FormData();
    
    // Append all form fields
    formData.append('title', form.value.title);
    formData.append('location', form.value.location);
    formData.append('location_url', form.value.location_url || '');
    formData.append('unit_type', form.value.unit_type);
    formData.append('furnished', form.value.furnished);
    formData.append('price_ksh', form.value.price_ksh.toString());
    formData.append('bedroom_count', form.value.bedroom_count.toString());
    formData.append('bathroom_count', form.value.bathroom_count.toString());
    formData.append('garage_count', form.value.garage_count.toString());
    formData.append('description', form.value.description);
    formData.append('features', form.value.features);
    formData.append('amenities', form.value.amenities);

    // Handle primary image
    if(primaryImage.value) {
      formData.append('primary_image', primaryImage.value);
    }

    // Handle gallery images
    galleryImages.value.forEach((file, index) => {
      formData.append(`gallery_images[${index}]`, file);
    });

    const response = await axios.post(
      `http://127.0.0.1:8000/api/properties/${form.value.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      }
    );
    
    message.value = response.data.message || 'Property updated successfully';
    setTimeout(() => {
      message.value = '';
      router.push('/listings');
    }, 3000);
  } catch (err: any) {
    error.value = err.response?.data?.message || 
                 err.response?.data?.errors || 
                 'Failed to update property';
    console.error('Error details:', err.response);
  } finally {
    submitting.value = false;
  }
};
  
  fetchProperty();
  </script>