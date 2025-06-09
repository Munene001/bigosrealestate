```vue
<template>
  <Headerlite />
  <div
    class="p-[10px] box-border flex flex-col gap-[10px] border-b border-black"
  >
    <div class="text-orange-900 font-bold">POST A NEW PROPERTY</div>
    <form
      @submit.prevent="submitProperty"
      class="flex flex-col gap-[40px] md:gap-[25px]"
    >
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="title">Title :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model="form.title"
          type="text"
          id="title"
          placeholder="Use Capital letters"
          required
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="location">Location :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model="form.location"
          type="text"
          id="location"
          placeholder="Format example: Kilimani,Nairobi"
          required
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="location_url">Location URL(Optional) :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model="form.location_url"
          type="url"
          id="location_url"
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="unit_type">Unit Type :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model="form.unit_type"
          type="text"
          id="unit_type"
          placeholder="example: 2 bedroom, 1 bedroom, bungallow, Mansionatte"
          required
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="furnished">Furnished :</label>
        <select
          class="border border-black h-[42px] p-[8px]"
          v-model="form.furnished"
          id="furnished"
          required
        >
          <option class="w-full" value="No">No</option>
          <option class="w-full" value="Yes">Yes</option>
        </select>
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="listing_type">Listing Type :</label>
        <select
          class="border border-black h-[42px] p-[8px]"
          v-model="form.listing_type"
          id="listing_type"
          required
        >
          <option class="w-full" value="for sale">For Sale</option>
          <option class="w-full" value="for rent">For Rent</option>
        </select>
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="price_ksh">Price (KSH) :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model.number="form.price_ksh"
          type="number"
          id="price_ksh"
          required
          @wheel.prevent
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="bedroom_count">Bedrooms Count :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model.number="form.bedroom_count"
          type="number"
          id="bedroom_count"
          required
          @wheel.prevent
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="bathroom_count">Bathroom Count :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model.number="form.bathroom_count"
          type="number"
          id="bathroom_count"
          required
          @wheel.prevent
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="garage_count">Garage Count :</label>
        <input
          class="border border-black h-[42px] p-[8px]"
          v-model.number="form.garage_count"
          type="number"
          id="garage_count"
          required
          @wheel.prevent
        />
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="primary_image">Primary Image (Required, <250KB) :</label>
        <input
          type="file"
          id="primary_image"
          accept="image/jpeg,image/png,image/webp"
          @change="handlePrimaryImage"
          required
        />
        <p v-if="primaryImage" class="text-sm">Selected: {{ primaryImage.name }}</p>
      </div>
      <div class="flex flex-col gap-[10px]">
        <label class="text-orange-900" for="gallery_images">Gallery Images (Optional, <250KB each) :</label>
        <input
          type="file"
          id="gallery_images"
          accept="image/jpeg,image/png,image/webp"
          multiple
          @change="handleGalleryImages"
        />
        <p v-if="galleryImages.length" class="text-sm">Selected: {{ galleryImages.length }} images</p>
      </div>
      <div class="flex flex-col gap-[17px]">
        <div class="flex flex-col gap-[5px]">
          <label class="text-orange-900" for="description">Description :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.description"
            id="description"
            placeholder="A brief description, do not exceed 200 words, follow paragraph rules"
          ></textarea>
        </div>
        <div class="flex flex-col gap-[5px]">
          <label class="text-orange-900" for="features">Features :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.features"
            id="features"
            placeholder="Go to new line after every bullet point, Entails details like tilled floors, open planned kitchen, nice doors."
          ></textarea>
        </div>
        <div class="flex flex-col gap-[5px]">
          <label class="text-orange-900" for="amenities">Amenities :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.amenities"
            id="amenities"
            placeholder="Go to newline after every bullet point, Entails details like: gym, ample parking,"
            required
          ></textarea>
        </div>
      </div>
      <button
        class="block bg-orange-500 w-[50%] h-[38px] mx-auto hover:bg-orange-300 border-2 border-black-500"
        type="submit"
        :disabled="loading"
      >
        {{ loading ? "Submitting..." : "Submit Property" }}
      </button>
    </form>
    <div
      class="block mx-auto"
      :class="{ 'text-green-500': !error, 'text-red-500': error }"
      v-if="message"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Headerlite from "../components/Headerlite.vue";
import axios from "axios";
import { ref } from "vue";

interface PropertyForm {
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
  listing_type:"for sale" | "for rent";
}

const form = ref<PropertyForm>({
  title: "",
  location: "",
  location_url: null,
  unit_type: "",
  furnished: "No",
  price_ksh: 0,
  bedroom_count: 0,
  bathroom_count: 0,
  garage_count: 0,
  description: "",
  features: "",
  amenities: "",
  listing_type:"for sale"
});

const primaryImage = ref<File | null>(null);
const galleryImages = ref<File[]>([]);
const loading = ref(false);
const message = ref("");
const error = ref(false);

const handlePrimaryImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    if (input.files[0].size > 250 * 1024) {
      error.value = true;
      message.value = "Primary image must be under 250KB";
      input.value = "";
      primaryImage.value = null;
    } else {
      primaryImage.value = input.files[0];
      error.value = false;
      message.value = "";
    }
  }
};

const handleGalleryImages = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);
    galleryImages.value = files.filter(file => file.size <= 250 * 1024);
    if (files.length !== galleryImages.value.length) {
      error.value = true;
      message.value = "Some gallery images exceed 250KB";
    } else {
      error.value = false;
      message.value = "";
    }
  }
};

const submitProperty = async () => {
  loading.value = true;
  message.value = "";
  error.value = false;

  if (!primaryImage.value) {
    error.value = true;
    message.value = "Primary image is required";
    loading.value = false;
    return;
  }

  try {
    const formData = new FormData();
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, value !== null ? value.toString() : "");
    });
    formData.append("primary_image", primaryImage.value);
    galleryImages.value.forEach((file, index) => {
      formData.append(`gallery_images[${index}]`, file);
    });

    const response = await axios.post(
      "http://127.0.0.1:8000/api/properties",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    message.value = response.data.message;
    error.value = false;
    form.value = {
      title: "",
      location: "",
      location_url: null,
      unit_type: "",
      furnished: "No",
      price_ksh: 0,
      bedroom_count: 0,
      bathroom_count: 0,
      garage_count: 0,
      description: "",
      features: "",
      amenities: "",
      listing_type:"for sale"
    };
    primaryImage.value = null;
    galleryImages.value = [];
    setTimeout(() => {
      message.value = "";
    }, 9000);
  } catch (err: any) {
    error.value = true;
    message.value = err.response?.data?.message || "Failed to post property";
    setTimeout(() => {
      message.value = "";
    }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>
```