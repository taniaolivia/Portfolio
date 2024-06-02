<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <div class="popin--header">
      <img :src="cdn + 'datas/experience/experience.png'" class="popin--icon"/>
      <h1 class="popin--title">{{ experience.name }}</h1>
    </div>
    
    <div class="popin--edus">
      <div class="popin--experience" v-for="e in experience.works">
        <img class="popin--experience-logo" :src="e.logo" draggable="false" :class="e.id === 'neonomade' ? 'neonomade' : ''"/>
        <span class="popin--edu-description" v-html="e.name"></span>
        <span class="popin--edu-description-2" v-html="e.date"></span>
        <span class="popin--edu-description-2" v-html="e.location"></span>
        <span class="popin--experience-description" v-html="e.languages"></span>
        <span class="popin--experience-description" v-html="e.other" v-if="e.other !== undefined"></span>
        <span class="popin--experience-description" v-html="e.objectif"></span>
        <div class="popin--experience-description">
          <span class="txt--bold">Activities :</span>
          <ul>
            <li class="popin--list" v-for="a in e.activities" v-html="a"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let cdn = import.meta.env.VITE_CDN_URL;

const props = defineProps({
    experience: Object  
})
</script>