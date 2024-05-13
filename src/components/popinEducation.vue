<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ education.name }}</h1>
    
    <li class="popin--list">
      <span class="popin--edu-description" v-html="education.master.degree"></span>
      <span class="popin--edu-description-2" v-html="education.master.year"></span>
      <span class="popin--edu-description-2" v-html="education.master.location"></span>
    </li>

    <li class="popin--list">
      <span class="popin--edu-description" v-html="education.bachelor.degree"></span>
      <span class="popin--edu-description-2" v-html="education.bachelor.year"></span>
      <span class="popin--edu-description-2" v-html="education.bachelor.location"></span>
    </li>

    <li class="popin--list">
      <span class="popin--edu-description" v-html="education.undergraduate.degree"></span>
      <span class="popin--edu-description-2" v-html="education.undergraduate.year"></span>
      <span class="popin--edu-description-2" v-html="education.undergraduate.location"></span>
    </li>

    <li class="popin--list">
      <span class="popin--edu-description" v-html="education.course.degree"></span>
      <span class="popin--edu-description-2" v-html="education.course.year"></span>
      <span class="popin--edu-description-2" v-html="education.course.location"></span>
    </li>

    <li class="popin--list">
      <span class="popin--edu-description" v-html="education.highSchool.degree"></span>
      <span class="popin--edu-description-2" v-html="education.highSchool.year"></span>
      <span class="popin--edu-description-2" v-html="education.highSchool.location"></span>
    </li>
  </div>
</template>

<script setup>
const props = defineProps({
    education: Object  
})
</script>