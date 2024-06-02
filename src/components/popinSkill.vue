<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <div class="popin--header">
      <img :src="cdn + 'datas/competence/competence.png'" class="popin--icon"/>
      <h1 class="popin--title">{{ skill.name }}</h1>
    </div>
    
    <div class="popin--edus">
      <div class="popin--edu" v-for="s in skill.skills">
        <p v-html="s.name" class="popin--edu-description"></p><br>
        <p v-html="s.skill" class="popin--edu-description-2"></p><br>
      </div>
    </div>
  </div>
</template>

<script setup>
let cdn = import.meta.env.VITE_CDN_URL;

const props = defineProps({
    skill: Object  
})
</script>