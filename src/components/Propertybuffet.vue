<template>
  <div class="p-[20px] flex flex-col gap-[20px] relative">
    <div class="flex flex-col gap-[10px]">
      <div class="text-[32px] font-bold leading-[35px] text-[#050400] font-[Sans-serif]">Review our Portfolio</div>
      <div class="text-[16px] font-semibold leading-[24px]  text-[#3c3b32]">
        Bigo Real Estate offers a portfolio as dynamic as your aspirations. Browse through our curated categories to discover the ideal property that aligns with your vision for a dream home or rewarding investment.
      </div>

      <!-- Navigation Arrows -->
      <div class="flex gap-4 justify-center mt-4">
        <button 
          @click="prevSlide"
          class="bg-orange-500 text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-colors"
          :disabled="loading || properties.length <= propertiesPerPage"
        >
          <Icon icon = "line-md:arrow-left"/>
        </button>
        <button 
          @click="nextSlide"
          class="bg-orange-500 text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-colors"
          :disabled="loading || properties.length <= propertiesPerPage"
        >
          <Icon icon = "line-md:arrow-right"/>
        </button>
      </div>
    </div>

    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="properties.length === 0">No properties found</div>
      <div v-else class="relative">
        
        <div class="overflow-hidden">
          <div 
            class="grid grid-flow-col md:gap-[25px] md:border  transition-transform duration-500 ease-in-out"
            :style="{
              gridTemplateColumns: `repeat(${paddedProperties.length}, ${100 / propertiesPerPage}% )`,
              transform: `translateX(-${(currentIndex / propertiesPerPage) * 100}%)`
            }"
          >
            <div 
              v-for="(property, index) in paddedProperties" 
              :key="`${property.id}-${index}`"
              class="flex flex-col gap-[30px] w-full transition-all duration-300 md:border md:border-gray-300 md:p-[10px] hover:scale-[1.02]"
            >
              <div v-if="property.images && property.images.length > 0"  @click="detailProperty(property.id)"   class="overflow-hidden rounded-t-lg">
                <img
                  :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url"
                  :alt="property.title"
                  class="h-[290px] w-full object-cover hover:scale-105 transition-transform duration-300"
                >
              </div>
              <div class="flex bg-black text-orange-500 w-[40%] h-[35px]  font-[Sans-serif] items-center justify-center">Available</div>
              <div class="text-[18px] font-semibold leading-[23px]">
                <span>{{ property.title }}</span> | <span>{{ property.location }}</span> | <span>{{ property.unit_type }}</span>
              </div>
              <div class="flex flex-row justify-between font-[Sans-serif]">
                <div>Price: {{ formatPrice(property.price_ksh) }}</div>
                <router-link to= '/contact' class="flex bg-orange-500 text-black w-[40%] h-[35px] items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  {{ property.listing_type === 'for sale' ? 'Buy Now' : 'Rent Now' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicator Dots -->
    <div v-if="!loading && !error && properties.length > 0" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(_, index) in Math.ceil(properties.length / propertiesPerPage)"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-colors"
        :class="{
          'bg-orange-500': Math.floor(currentIndex / propertiesPerPage) === index,
          'bg-gray-300': Math.floor(currentIndex / propertiesPerPage) !== index
        }"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

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
  created_at: string;
  listing_type: "for sale" | "for rent";
  construction_status: 'complete' | 'unfinished';
  images: Image[];
}

interface ApiResponse {
  properties: Property[];
  count: number;
  listing_type: string | null;
}

const properties = ref<Property[]>([]);
const loading = ref(true);
const error = ref("");
const currentIndex = ref(0);
const router = useRouter();

const detailProperty = (id: number) =>{
  router.push(`/buyorrent/details/${id}`)
}

// Responsive handling
const isSmallScreen = ref(window.innerWidth < 768);
const isMediumScreen = ref(window.innerWidth >= 768 && window.innerWidth < 1024);
const isLargeScreen = ref(window.innerWidth >= 1024);

const propertiesPerPage = computed(() => {
  if (isSmallScreen.value) return 1;
  if (isMediumScreen.value) return 2;
  return 4;
});

// Padded properties for endless carousel
const paddedProperties = computed(() => {
  if (properties.value.length === 0) return [];
  const totalSlides = Math.ceil(properties.value.length / propertiesPerPage.value);
  const repeatCount = Math.max(2, totalSlides);
  return Array(repeatCount).fill(properties.value).flat().slice(0, repeatCount * properties.value.length);
});

// Carousel controls
let carouselInterval: NodeJS.Timeout | null = null;

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetCarouselTimer = () => {
  if (carouselInterval) clearInterval(carouselInterval);
  startCarousel();
};

const prevSlide = () => {
  resetCarouselTimer();
  currentIndex.value = (currentIndex.value - propertiesPerPage.value + properties.value.length) % properties.value.length;
};

const nextSlide = () => {
  resetCarouselTimer();
  currentIndex.value = (currentIndex.value + propertiesPerPage.value) % properties.value.length;
  if (currentIndex.value === 0 && properties.value.length > propertiesPerPage.value) {
    setTimeout(() => {
      currentIndex.value = 0;
    }, 500);
  }
};

const goToSlide = (slideIndex: number) => {
  resetCarouselTimer();
  currentIndex.value = slideIndex * propertiesPerPage.value % properties.value.length;
};

const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 768;
  isMediumScreen.value = window.innerWidth >= 768 && window.innerWidth < 1024;
  isLargeScreen.value = window.innerWidth >= 1024;
  currentIndex.value = 0;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(price);
};

const fetchProperties = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get<ApiResponse>(`http://127.0.0.1:8000/api/properties`, {
      params: { with_images: true },
      headers: { Accept: "application/json" },
    });
    properties.value = response.data.properties;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch properties";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProperties();
  startCarousel();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval);
  window.removeEventListener('resize', handleResize);
});
</script>
