<template>
    <div class="md:py-[25px] md:px-[25px] py-[10px] px-[10px] flex flex-col gap-[25px]">
        <div v-if = "loading">Loading...</div>
        <div v-else-if = "error" class="text-red-500">{{ error }}</div>
        <div v-if="!loading && !error && property" class="flex flex-row"><Icon icon = "mage:home"/><Icon icon = "lsicon:right-filled" /><span class="align-middle font-light">Apartments <Icon icon = "lsicon:right-filled" /> {{property.title}}</span></div>
        <div  v-if="property" class="flex flex-col gap-[25px]">
            <div class="flex flex-col gap-[5px]">
            <div class="font-[Montserrat] text-[24px]  font-semibold  leading-[32px]"><span>{{ property.title }}</span> | <span>{{ property.location }}</span> | <span>{{ property.unit_type }}</span></div>
            <div class="text-[19px] md:text-[23px] leading-[32px] md:leading-[40px] font-semibold"><span class="font-normal text-gray-500">price-></span>Ksh: {{ property.price_ksh }}</div>
            </div>
            <div class="flex flex-col gap-[20px]">
            <div class="text-[20px] font-semibold leading-[30px] font-[Montserrat]">Property Features</div>
            <div class="flex flex-col gap-[10px] text-[16px] leading-[24px]">
                <div class="flex flex-row items-center gap-[10px]"><Icon icon = "marketeq:bedroom-6" style="width: 30px; height: 30px; color: black;"/>{{ property.bedroom_count }} bedrooms</div>
                <div class="flex flex-row items-center gap-[10px]"><Icon icon = "marketeq:bathroom-2" style="width: 30px; height: 30px; color: black;"/>{{ property.bathroom_count }} bathrooms</div>
                <div class="flex flex-row items-center gap-[10px]"><Icon icon = "tabler:car-garage" style="width: 30px; height: 30px;" />{{ property.garage_count }} garage</div>
                
                
            </div>
            </div>


        </div>

    </div>
</template>
<script setup lang = "ts">
import axios from 'axios';
import {ref} from 'vue';
import { useRoute } from "vue-router";
 


interface Image{
    id:number;
    property_id:number;
    image_url:string;
    is_primary:boolean;
}

interface Property{
    id:number;
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
const route = useRoute();
const id = Number(route.params.id);
const property = ref<Property>();
const loading = ref(true);
const error = ref("");



const fetchProperty = async() =>{
    loading.value = true;
    error.value = ""
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`,{
            params:{
                with_images:true
            },
            headers:{
                Accept: "application/json",
            }
        });
        property.value = response.data;
        
    } catch (err:any) {
        error.value = err.response?.data?.message || "Failed to fetch properties";
        
    }finally{
        loading.value = false;
    }
};
fetchProperty();
</script>