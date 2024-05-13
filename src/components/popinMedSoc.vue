<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ mediaSocial.name }}</h1>
    
    <label class="popin--label">Email address</label>
    <a href="mailto:taniaoliviaa@yahoo.com" target="_blank">
      <p class="popin--description" v-html="mediaSocial.email"></p>
    </a>

    <label class="popin--label">LinkedIn</label>
    <a :href="mediaSocial.linkedin" target="_blank">
      <p class="popin--description" v-html="mediaSocial.linkedin"></p>
    </a>

    <label class="popin--label">Github</label>
    <a :href="mediaSocial.github" target="_blank">
      <p class="popin--description" v-html="mediaSocial.github"></p>
    </a>

    <label class="popin--label">Information</label>
    <p class="popin--description" v-html="mediaSocial.information"></p>
  </div>
</template>

<script setup>
const props = defineProps({
    mediaSocial: Object  
})
</script>