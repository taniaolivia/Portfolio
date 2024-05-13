<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ project.name }}</h1>
    
    <label class="popin--label">Year</label>
    <p class="popin--description" v-html="project.year"></p>

    <label class="popin--label">Genre</label>
    <p class="popin--description" v-html="project.genre"></p>

    <label class="popin--label">Status</label>
    <p class="popin--description" v-html="project.status"></p>

    <label class="popin--label">Programming languages</label>
    <p class="popin--description" v-html="project.languages"></p>

    <label class="popin--label">Description</label>
    <p class="popin--description" v-html="project.description"></p>

    <label class="popin--label">Project Links</label>
    <li class="popin--list" v-html="project.links"></li>

  </div>
</template>

<script setup>
const props = defineProps({
    project: Object  
})
</script>