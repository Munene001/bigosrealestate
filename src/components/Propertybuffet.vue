<template>
    <div class="p-[20px] flex flex-col gap-[20px]">
      <div class="flex flex-col gap-[10px]">
        <div class="text-[32px] font-bold leading-[35px] text-[#050400]">Review our Portfolio</div>
        <div class="text-[16px] font-semibold leading-[18px] font-[Montserrat] text-[#3c3b32]">
          Bigo Real Estate offers a portfolio as dynamic as your aspirations. Browse through our curated categories to discover the ideal property that aligns with your vision for a dream home or rewarding investment.
        </div>
      </div>
      <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="properties.length === 0">No properties found</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-[25px]">
          <div v-for="property in visibleProperties" :key="property.id" class="flex flex-col gap-[30px] w-[290px] ">
            <div v-if="property.images && property.images.length > 0">
              <img
                :src="property.images.find(img => img.is_primary)?.image_url || property.images[0].image_url"
                :alt="property.title"
                class="md:h-[290px] md:w-[290px]  h-[290px] w-[100%] object-cover"
              >
            </div>
            <div class="flex bg-black text-orange-500 w-[40%] h-[35px] items-center justify-center">Available</div>
            <div class="text-[18px] font-semibold leading-[23px]">
              <span>{{ property.title }}</span> | <span>{{ property.location }}</span> | <span>{{ property.unit_type }}</span>
            </div>
            <div class="flex flex-row justify-between">
              <div>Price: {{ property.price_ksh }}</div>
              <div class="flex bg-orange-500 text-black w-[40%] h-[35px] items-center justify-center">
                {{ property.listing_type === 'for sale' ? 'Buy Now' : 'Rent Now' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  
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
  const count = ref(0);
  const listingType = ref<string | null>(null);
  const loading = ref(true);
  const error = ref("");
  const currentIndex = ref(0);
  
  // Determine number of visible properties based on screen size
  const isMediumScreen = ref(window.innerWidth >= 768); // Tailwind's 'md' breakpoint
  const propertiesPerPage = computed(() => isMediumScreen.value ? 4 : 1);
  
  // Compute visible properties for the carousel
  const visibleProperties = computed(() => {
    if (properties.value.length === 0) return [];
    const start = currentIndex.value % properties.value.length;
    const end = start + propertiesPerPage.value;
    if (end <= properties.value.length) {
      return properties.value.slice(start, end);
    }
    return [...properties.value.slice(start), ...properties.value.slice(0, end - properties.value.length)];
  });
  
  // Update carousel every 5 seconds
  let carouselInterval: NodeJS.Timeout | null = null;
  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      currentIndex.value = (currentIndex.value + propertiesPerPage.value) % properties.value.length;
    }, 5000);
  };
  
  // Handle screen resize to update grid layout
  const handleResize = () => {
    isMediumScreen.value = window.innerWidth >= 768;
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
      count.value = response.data.count;
      listingType.value = response.data.listing_type;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch properties";
    } finally {
      loading.value = false;
    }
  };
  
  // Lifecycle hooks
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