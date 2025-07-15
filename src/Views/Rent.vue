<template>
  <div
    class="md:pb-[20px] md:px-[0px] py-[10px] md:py-[0px] px-[10px] flex flex-col gap-[15px]"
  >
    <div
      class="flex flex-col gap-[15px] md:flex md:flex-row bg-gray-100 md:py-[20px] md:px-[3px] md:justify-evenly"
    >
      <div class="font-[Sans-serif]">
        <select
          class="w-full h-[47px] bg-orange-50 border border-gray-400"
          v-model="filters.bedrooms"
          placeholder="Bedrooms"
        >
          <option
            :value="null"
            disabled
            selected
            hidden
            class="border border-b-gray-40"
          >
            Bedrooms
          </option>
          <option v-for="n in 10" :value="n" class="border border-b-gray-400">
            {{ n }}
          </option>
        </select>
      </div>
      <div class="font-[Sans-serif]">
        <select
          class="w-full h-[47px] bg-orange-50 border border-gray-400"
          v-model="filters.location"
          placeholder="Location"
        >
          <option :value="null" disabled selected hidden>Location</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Kilimani">Kilimani</option>
          <option value="Runda">Runda</option>
          <option value="Kileleshwa">Kileleshwa</option>
          <option value="Westlands">Westlands</option>
          <option value="Girigiri">Girigiri</option>
          <option value="Karen">Karen</option>
          <option value="Uthiru">Uthiru</option>
          <option value="Nakuru">Nakuru</option>
        </select>
      </div>
      <div class="font-[Sans-serif]">
        <select
          class="w-full h-[47px] bg-orange-50 border border-gray-400"
          v-model="filters.bathrooms"
          placeholder="Bathrooms"
        >
          <option :value="null" disabled selected hidden>Bathrooms</option>
          <option v-for="n in 10" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="font-[Sans-serif]">
        <input
          v-model.number="filters.max_price"
          type="number"
          placeholder="Maximum Price in KSH"
          class="w-full md:w-[150px] bg-orange-50 h-[47px] border border-gray-400 p-[10px]"
        />
      </div>
      <div class="font-[Sans-serif]">
        <select
          class="w-full h-[47px] bg-orange-50 border border-gray-400"
          v-model="filters.furnished"
          placeholder="Furnished"
        >
          <option :value="null" disabled selected hidden>Furnished</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div class="font-[Sans-serif]">
        <select
          class="w-full h-[47px] bg-orange-50 border border-gray-400"
          v-model="filters.construction_status"
          placeholder="Construction Status"
        >
          <option :value="null" disabled selected hidden>
            Construction Status
          </option>
          <option value="complete">Complete</option>
          <option value="unfinished">Unfinished</option>
        </select>
      </div>
      <div class="font-[Sans-serif]">
        <button
          @click="resetFilters"
          class="h-[37px] md:h-[47px] px-[15px] bg-orange-500 text-black hover:bg-gray-300"
        >
          Undo Filters
        </button>
      </div>
    </div>
    <div class="md:px-[15px] md:flex">
      <div v-if="loading">Loading....</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div
        v-else-if="properties.length === 0"
        class="text-[22px] font-[Sans-serif]"
      >
        No properties found
      </div>

      <div v-else class="flex flex-col gap-[15px] md:w-[85vw]">
        <router-link
          to="/buyorrent/buy"
          v-if="!loading && !error"
          class="flex flex-row"
        >
          <Icon icon="mage:home" /><Icon icon="lsicon:right-filled" /><span
            class="align-middle font-light"
            >Apartments For Sale</span
          >
        </router-link>
        <div
          v-if="!loading && !error"
          class="text-[35px] leading-[45px] font-bold"
        >
          {{ count }} Apartments
        </div>
        <div class="flex flex-col gap-[35px]">
          <div
            v-for="property in properties"
            :key="property.id"
            class="flex flex-col gap-[28px] border pb-[15px] border-gray-300 w-[full] md:flex md:flex-row transition-transform duration-500 ease-in-out hover:scale-105"
          >
            <div v-if="property.images && property.images.length > 0">
              <img
                :src="
                  property.images.find((img) => img.is_primary)?.image_url ||
                  property.images[0].image_url
                "
                :alt="property.title"
                class="h-[250px] w-[100%] md:w-[500px] md:h-[300px] object-cover"
              />
            </div>
            <div
              class="flex flex-col gap-[28px] md:flex md:flex-col md:justify-center w-full"
            >
              <div
                class="flex flex-row justify-between px-[10px] w-[full] items-center"
              >
                <div
                  class="font-[Sans-serif] px-[7px] bg-orange-500 text-[14px] md:text-[18px] leading-[28px] md:leading-[35px] font-medium text-white"
                >
                  construction {{ property.construction_status }}
                </div>
                <div
                  class="text-[19px] md:text-[23px] leading-[32px] md:leading-[40px] font-semibold"
                >
                  Ksh: {{ property.price_ksh }}
                </div>
              </div>
              <div
                class="px-[7px] text-[24px] md:text-[28px] font-semibold md:leading-[40px] leading-[32px]"
              >
                <span>{{ property.title }}</span> |
                <span>{{ property.location }}</span> |
                <span>{{ property.unit_type }}</span>
              </div>
              <div class="flex flex-row justify-between px-[7px]">
                <router-link
                  to="/contact"
                  class="py-[10px] md:px-[45px] px-[32px] bg-black text-orange-500 font-medium hover:bg-transparent font-[Sans-serif] text-[18px]"
                  >Contact us</router-link
                >
                <button
                  @click="detailProperty(property.id)"
                  class="py-[10px] md:px-[45px] px-[32px] bg-transparent border border-black hover:bg-orange-500 font-[Sans-serif] text-[18px]"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:px-[30px] box-border w-[20vw] py-[100px]">
        <div
          class=" p-5 box-border flex flex-col   gap-2.5"
        >
          <div
            class="text-[19px] font-semibold leading-[22.8px] text-[rgb(62,68,148)]"
          >
            Need Help ?
          </div>
          <div
            class="text-[13px] font-normal leading-[22.1px] text-[rgb(59,59,59)]"
          >
            Please feel free to contact us. We will get back to you as soon as
            possible
          </div>
          <div class="flex items-center gap-2">
            <Icon
              icon="ic:baseline-phone"
              width="27"
              height="27"
            ></Icon>
            <div class="text-[Sans-serif]">
              <span>+254726551880</span><br />
              <span>+254 786189755</span><br />
              <span>+254100974188</span>
            </div>
          </div>
          <div class="text-[16px] font-normal leading-[27.2px]">
            info@bigosrealestate.co.ke
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

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
  construction_status: "complete" | "unfinished";
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
const router = useRouter();

const initialFilters = {
  bedrooms: null as number | null,
  bathrooms: null as number | null,
  location: null as string | null,
  max_price: null as number | null,
  furnished: null as "Yes" | "No" | null,
  construction_status: null as "complete" | "unfinished" | null,
};

const filters = ref({ ...initialFilters });

// Debounce function
const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Clean filter payload
const cleanFilters = (filters: typeof initialFilters) => {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// Fetch properties
const fetchProperties = async () => {
  loading.value = true;
  error.value = "";
  try {
    let response;
    if (!hasFilters.value) {
      response = await axios.get<ApiResponse>(
        `https://bigosrealestate.com/api/public/index.php/api/properties`,
        {
          params: {
            with_images: true,
            listing_type: "for rent",
          },
          headers: { Accept: "application/json" },
        }
      );
    } else {
      response = await axios.post<ApiResponse>(
        `https://bigosrealestate.com/api/public/index.php/api/search`,
        cleanFilters(filters.value),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    }
    properties.value = response.data.properties;
    count.value = response.data.count;
    listingType.value = response.data.listing_type;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch properties";
  } finally {
    loading.value = false;
  }
};

// Debounced fetch
const debouncedFetch = debounce(fetchProperties, 1200);

// Check if filters are applied
const hasFilters = computed(() =>
  Object.values(filters.value).some((val) => val !== null && val !== undefined)
);

// Reset filters
const resetFilters = () => {
  filters.value = { ...initialFilters };
  debouncedFetch();
};

// Navigate to property details
const detailProperty = (id: number) => {
  router.push(`details/${id}`);
};

// Watch filters for changes
watch(filters, debouncedFetch, { deep: true });

// Initial fetch
fetchProperties();
</script>
