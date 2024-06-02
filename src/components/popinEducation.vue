<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <div class="popin--header">
      <img :src="cdn + 'datas/education/education.png'" class="popin--icon"/>
      <h1 class="popin--title">{{ education.name }}</h1>
    </div>
   
    
    <div class="popin--edus">
      <div class="popin--edu" v-for="edu in education.school">
        <img class="popin--edu-logo" :src="edu.logo" draggable="false"/>
        <span class="popin--edu-description" v-html="edu.degree"></span>
        <span class="popin--edu-description-2" v-html="edu.year"></span>
        <span class="popin--edu-description-2" v-html="edu.location"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
let cdn = import.meta.env.VITE_CDN_URL;

const props = defineProps({
    education: Object  
})
</script>