<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <div class="popin--header">
      <img :src="cdn + 'datas/medsoc/medsoc.png'" class="popin--icon"/>
      <h1 class="popin--title">{{ mediaSocial.name }}</h1>
    </div>
    
    <div class="popin--medsocs">
      <div class="popin--medsoc-info">
        <img class="popin--medsoc-logo" :src="mediaSocial.links[3].logo" draggable="false"/>
        <label class="popin--medsoc-description" v-html="mediaSocial.links[3].name"></label>

        <p class="popin--medsoc-description-2" v-html="mediaSocial.links[3].description"></p>
      </div>
    </div>

    <div class="popin--medsocs">
      <div class="popin--medsoc" v-for="med in 3">
        <img class="popin--medsoc-logo" :class="mediaSocial.links[med - 1].name === 'Github' ? 'github' : ''" :src="mediaSocial.links[med - 1].logo" draggable="false"/>
        <label class="popin--medsoc-description" v-html="mediaSocial.links[med - 1].name"></label>

        <a href="mailto:taniaoliviaa@yahoo.com" target="_blank" v-if="mediaSocial.links[med - 1].name === 'Email Address'">
          <p class="popin--medsoc-description-2" v-html="mediaSocial.links[med - 1].link"></p>
        </a>

        <a :href="mediaSocial.links[med - 1].link" target="_blank" v-else>
          <p class="popin--medsoc-description-2" v-html="mediaSocial.links[med - 1].link"></p>
        </a>
      </div>
    </div>
 
  </div>
</template>

<script setup>
let cdn = import.meta.env.VITE_CDN_URL;

const props = defineProps({
    mediaSocial: Object  
})
</script>