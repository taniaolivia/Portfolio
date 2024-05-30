<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ aboutMe.name }}</h1>

    <div class="popin--aboutme">
      <div class="popin--aboutme-content1">  
        <img :src="aboutMe.image" class="profile"/>
        <p class="popin--aboutme-description" v-html="aboutMe.description"></p>
      </div>
    
      <div class="popin--aboutme-content2">
        <label class="popin--label">CV</label>

        <div class="download-cv">
          <button @click="download(aboutMe.cv)" class="download">Download CV (English version)</button>
          <button @click="download(aboutMe.cvFrench)" class="download">Download CV (French version)</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
const props = defineProps({
    aboutMe: Object  
})

function download(link) {
  window.open(link, "_blank");
}
</script>