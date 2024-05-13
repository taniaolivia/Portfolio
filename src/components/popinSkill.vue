<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ skill.name }}</h1>
    
    <li class="popin--list" v-html="skill.programming"></li>
    <li class="popin--list" v-html="skill.framework"></li>
    <li class="popin--list" v-html="skill.orm"></li>
    <li class="popin--list" v-html="skill.other"></li>
    <li class="popin--list" v-html="skill.softwares"></li>
    <li class="popin--list" v-html="skill.otherSoftwares"></li>
    <li class="popin--list" v-html="skill.languages"></li>
  </div>
</template>

<script setup>
const props = defineProps({
    skill: Object  
})
</script>