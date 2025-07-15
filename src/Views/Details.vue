<template>
  <div
    class="md:py-[25px] md:px-[25px] py-[10px] px-[10px] flex flex-col gap-[25px] border border-b-gray-400"
  >
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="!loading && !error && property" class="flex flex-row">
      <Icon icon="mage:home" /><Icon icon="lsicon:right-filled" /><span
        class="align-middle font-light"
        >Apartments <Icon icon="lsicon:right-filled" />
        {{ property.title }}</span
      >
    </div>
    <div v-if="property" class="flex flex-col gap-[45px]">
      <div class="flex flex-col gap-[5px]">
        <div class="font-[Sans-serif] text-[24px] font-semibold leading-[32px]">
          <span>{{ property.title }}</span> |
          <span>{{ property.location }}</span> |
          <span>{{ property.unit_type }}</span>
        </div>
        <div
          class="text-[19px] md:text-[23px] leading-[32px] md:leading-[40px] font-semibold"
        >
          <span class="font-normal text-gray-500">price-></span>Ksh:
          {{ property.price_ksh }}
        </div>
      </div>
      <div v-if="property.images && property.images.length > 0" class="flex flex-col md:flex md:flex-row md:h-[450px] md:border border-gray-400">
    <a :href="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url" target="_self" class="md:w-[35%]">
        <img :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url" :alt="property.title" class="max-h-[450px] md:h-[450px] md:w-[40%] object-scale-down">
    </a>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <a v-for="(image, index) in property.images.filter(img => !img.is_primary)" :key="`gallery-image-${index}`" :href="image.image_url" target="_self" >
            <img :src="image.image_url" :alt="`${property.title} - Gallery Image ${index + 1}`" class="max-h-[450px] w-[100%] md:h-[225px] object-scale-down">
        </a>
    </div>
</div>
      <div class="flex flex-col gap-[10px]">
        <div class="text-[20px] font-semibold leading-[30px] font-[Sans-serif]">
          Description
        </div>
        <div
          class="font-[Sans-serif] text-[18px] leading-[26px] font-medium text-[#333330]"
        >
          {{ property.description }}
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <div class="text-[20px] font-semibold leading-[30px] font-[Sans-serif]">
          Property Features
        </div>
        <div class="flex flex-col gap-[10px] text-[18px] leading-[24px]  ">
          <div class="flex flex-row items-center gap-[10px] font-[Sans-serif]">
            <Icon
              icon="marketeq:bedroom-6"
              style="color: orange;"
            />{{ property.bedroom_count }} bedrooms
          </div>
          <div class="flex flex-row items-center gap-[10px] font-[Sans-serif]">
            <Icon
              icon="marketeq:bathroom-2"
              style="width: 30px; height: 30px; color: black"
            />{{ property.bathroom_count }} bathrooms
          </div>
          <div class="flex flex-row items-center gap-[10px] font-[Sans-serif]">
            <Icon
              icon="tabler:car-garage"
              style="width: 30px; height: 30px"
            />{{ property.garage_count }} garage
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <div class="text-[20px] font-semibold leading-[30px] font-[Sans-serif]">
          Features
        </div>
        <div
          v-for="(feature, index) in property.features
            .split('\n')
            .filter((f) => f.trim() !== '')"
          :key="`feature-${index}`"
          class="flex flex-col my-[10px] font-[Sans-serif] text-[18px]"
        >
          <span class="flex flex-row gap-[20px] items-center"
            ><Icon icon="game-icons:hammer-nails" style="color: orange;" /> {{ feature.trim() }}</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-[10px]">
        <div class="text-[20px] font-semibold leading-[30px] font-[Sans-serif]">
          Fine Ameninties
        </div>
        <div
          v-for="(amenity, index) in property.amenities
            .split('\n')
            .filter((a) => a.trim() !== '')"
          :key="`amenity-${index}`"
          class="flex flex-col my-[10px] font-[Sans-serif] text-[18px]"
        >
          <span class="flex flex-row gap-[20px] items-center"
            ><Icon icon="material-symbols:apartment" style="color: orange;" />
            {{ amenity.trim() }}</span
          >
        </div>
      </div>
      <div v-if="property.location_url" class="flex flex-col gap-[10px]">
        <div class="text-[20px] font-semibold leading-[30px] font-[Sans-serif]">Exact Location</div>
        <div class="break-words font-[Sans-serif] text-[18px]">{{ property.location_url }}</div>
        

    
       
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

interface Image {
  id: number;
  property_id: number;
  image_url: string;
  is_primary: boolean;
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
  images?: Image[];
}
const route = useRoute();
const id = Number(route.params.id);
const property = ref<Property>();
const loading = ref(true);
const error = ref("");

const fetchProperty = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(
      `https://bigosrealestate.com/api/public/index.php/api/properties/${id}`,
      {
        params: {
          with_images: true,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    property.value = response.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch properties";
  } finally {
    loading.value = false;
  }
};
fetchProperty();
</script>
