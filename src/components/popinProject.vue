<template>
  <div class="popin">
    <div class="popin--close" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">{{ project.name }}</h1>
    
    <div class="popin--rd">
      <div class="popin--rd-content">
        <span class="popin--description" v-html="'<strong>Year : </strong>' + project.year"></span>
        <span class="popin--description" v-html="'<strong>Genre : </strong>' + project.genre"></span>
        <span class="popin--description" v-html="'<strong>Status : </strong>' + project.status"></span>
        <span class="popin--description" v-html="'<strong>Programming languages : </strong>' + project.languages"></span>
        <span class="popin--description" v-html="'<strong>Description : </strong>' + project.description"></span>
        <div class="popin--description">
          <span  v-html="'<br><strong>Project link(s) : </strong>'"></span>

          <ul>
            <a :href="link" v-for="link in project.links" target="_blank">
              <li class="popin--list" v-html="link"></li>
            </a>
          </ul>
        </div>

        <div class="popin--demo">
          <p class="popin--demo-title txt--bold">Ressources</p>

          <div class="popin--demo-list">
            <div class="popin--demo-content" v-for="ressource, index in project.ressources">
              <p class="popin--description txt--bold" v-html="ressource.page"></p><br>
              <p class="popin--description" v-html="ressource.description"></p><br>
              <a :href="ressource.link" target="_blank" v-if="ressource.link !== undefined">
                <span class="popin--description" v-html="'Click here'"></span>
              </a>

              <img :src="ressource.image" v-if="ressource.image !== undefined" @click="zoomImage(ressource.image)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="popin--image" v-if="clickedImage" @click="clickedImage = false">
    <img :src="clickedImageURL" class="zoomIn clickedImage"/>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    project: Object  
})

const clickedImage = ref(false);
const clickedImageURL = ref('');

function zoomImage(imageURL) {
  if(clickedImage.value === true) {
    clickedImage.value = false;
    clickedImageURL.value = imageURL;
  }
  else {
    clickedImage.value = true;
    clickedImageURL.value = imageURL;
  }
}
</script>