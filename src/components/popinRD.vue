<template>
  <div class="popin" @click="$emit('close')">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ rd.name }}</h1>
    
    <div class="popin--rd">
      <div class="popin--rd-content">
        <span class="popin--description" v-html="'<strong>Year : </strong>' + rd.year"></span>
        <span class="popin--description" v-html="'<strong>Genre : </strong>' + rd.genre"></span>
        <span class="popin--description" v-html="'<strong>Status : </strong>' + rd.status"></span>
        <span class="popin--description" v-html="'<strong>Programming languages : </strong>' + rd.languages"></span>
        <span class="popin--description" v-html="'<strong>Description : </strong>' + rd.description"></span>
        <div class="popin--description">
          <span  v-html="'<br><strong>Project link(s) : </strong>'"></span>

          <ul>
            <a :href="link" v-for="link in rd.links" target="_blank">
              <li class="popin--list" v-html="link"></li>
            </a>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
    rd: Object  
})
</script>