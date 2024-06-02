<template>
  <div id="map"></div>

  <img :src="cdn + 'info.png'" class="info" @click="openInformation()" draggable="false"/>

  <div id="mobileInterface" class="noSelect" v-if="deviceName === 'mobile'">
    <div id="joystick-wrapper"></div> 
  </div>

  <img :src="cdn + 'left-click.png'" :class="deviceName === 'mobile' ? 'click-btn' : 'click-btn-desktop'" draggable="false" @click="click()"/>

  <div class="popin" v-if="showPopinHow">
    <div class="popin--close" @click="close()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </div>

    <h1 class="popin--title">Welcome to Tania's World</h1>

    <div class="popin--how">
        <p class="popin--description1">
          Explore Tania's World by moving the character like a game to see all the projects that I've done, experiences and other informations of me.
        </p>
      
    
      <div class="popin--aboutme-content2">
        <label class="popin--label">How to play ?</label>
        <br>
        <div class="popin--description1 txt--bold">  
          IT'S RECOMMENDED TO HAVE A GOOD CONNECTION TO HAVE A FLUID EXPERIENCE&nbsp;!
        </div>
        <br>
        <div class="popin--description1" v-if="deviceName === 'desktop'">  
          Keys to move the character :<br>
          <ul>
            <li class="popin--list"><span class="txt--bold">Z</span> : Move forward (If you are using <span class="txt--bold">QWERTY KEYBOARD</span>, the key to move forward is <span class="txt--bold">W</span>)</li>
            <li class="popin--list"><span class="txt--bold">S</span> : Move backward</li>
            <li class="popin--list"><span class="txt--bold">D</span> : Move to the right</li>
            <li class="popin--list"><span class="txt--bold">Q</span> : Move to the left (If you are using <span class="txt--bold">QWERTY KEYBOARD</span>, the key to move to the left is <span class="txt--bold">A</span>)</li>
            <li class="popin--list">SPACE : To do the click movement, it'll be use to open the information where there's this image <img :src="cdn + 'left-click.png'" class="click"/> and move close to it. <span class="txt--bold">If when you've clicked, it shows nothing that means you need to move closer to this image this image <img :src="cdn + 'left-click.png'" class="click"/></span></li>
          </ul>

          <br>To see the informations of each stand and others, you need to move closer to this image <img :src="cdn + 'left-click.png'" class="click"/> and click this button <img :src="cdn + 'left-click.png'" class="click "/> which is on the right side bottom to open it. <span class="txt--bold">If when you've clicked, it shows nothing that means you need to move closer to this image <img :src="cdn + 'left-click.png'" class="click"/> and reclick the button <img :src="cdn + 'left-click.png'" class="click "/></span>
          <br><br><br>The keyboard by default is the <span class="txt--bold">EU keyboard.</span> You can change the keyboard to EU or US by clicking one of these buttons :
          <br>
          <div class="popin--buttons">
            <button @click="changeKeyboard('EU')" class="txt--bold">EU</button>
            <button @click="changeKeyboard('US')" class="txt--bold">US</button>    
          </div>
          
          <br>To move the direction of the character, you need to click and drag the screen by using your trackpad or mouse. I recommend you to use mouse to have a more fluid experience.
        </div>
        <br v-if="deviceName === 'mobile'">
        <div class="popin--description1" v-if="deviceName === 'mobile'">  
          To move the character (forward, backward, left, right) on your mobile phone, use the trackball on the left side.<br>
           
          <br>To move the direction of the character, you need to need to click and drag the screen to the direction that you want.
        </div>
        <br v-if="deviceName === 'mobile'">
        <div class="popin--description1" v-if="deviceName === 'mobile'">  
          To see the informations of each stand, you need to move closer to this image <img :src="cdn + 'left-click.png'" class="click"/> and click this button <img :src="cdn + 'left-click.png'" class="click "/> to open it. <span class="txt--bold">If when you've clicked, it shows nothing that means you need to move closer to this image <img :src="cdn + 'left-click.png'" class="click"/> and reclick the button <img :src="cdn + 'left-click.png'" class="click "/></span>
        </div>
        <br><br>
        <div class="popin--description1 txt--bold">  
          ENJOY&nbsp;!
        </div>
      </div>
    </div>
  </div>

  <div class="launchScreen" v-if="showLaunchScreen">
    <p class="txt--bold">Loading...</p>
    <div class="progressBar">
      <div class="progress"></div>
    </div>
  </div>

  <popinProject v-if="showPopin" :project="data.data.projects[openPopin]" @close="close"></popinProject>
  <popinRD v-if="showPopinRD" :rd="data.data.rd[openPopin]" @close="close"></popinRD>
  <popinAboutMe v-if="showPopinAboutMe" :about-me="data.data.aboutMe" @close="close"></popinAboutMe>
  <popinEducation v-if="showPopinEducation" :education="data.data.education" @close="close"></popinEducation>
  <popinExperience v-if="showPopinExperience" :experience="data.data.experiences" @close="close"></popinExperience>
  <popinMedSoc v-if="showPopinMedSoc" :media-social="data.data.socialMedias" @close="close"></popinMedSoc>
  <popinSkill v-if="showPopinSkill" :skill="data.data.skills" @close="close"></popinSkill>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import nipplejs from 'nipplejs';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import GUI from 'lil-gui'
import {ref, onBeforeMount, computed, watch} from "vue";
import popinProject from './components/popinProject.vue';
import data from "./data/tania.js";
import popinRD from './components/popinRD.vue';
import popinAboutMe from './components/popinAboutMe.vue';
import popinEducation from './components/popinEducation.vue';
import popinMedSoc from './components/popinMedSoc.vue';
import popinExperience from './components/popinExperience.vue';
import popinSkill from './components/popinSkill.vue';

let keyboard = ref("EU");
let deviceName = ref("");
let forwardKey = ref(90);
let leftKey = ref(81);

let showPopin = ref(false);
let showPopinRD = ref(false);
let showPopinExperience = ref(false);
let showPopinSkill = ref(false);
let showPopinMedSoc = ref(false);
let showPopinEducation = ref(false);
let showPopinAboutMe = ref(false);
let showPopinHow = ref(false);
let openPopin = ref(4);
let showLaunchScreen = ref(true);


let mixer, walkModel, walk;
let wave, mapModel, bridge1, bridge2, bridge3, bridge4;
let bridgeHandleR1, bridgeHandleR2, bridgeHandleR3, bridgeHandleR4, bridgeHandleL1, bridgeHandleL2, bridgeHandleL3, bridgeHandleL4;
let arrowLeftModel, pointingArrowLeft, arrowLeftMixer;
let arrowRightModel, pointingArrowRight, arrowRightMixer;
let arrowFrontModel, pointingArrowFront, arrowFrontMixer;

let cdn = import.meta.env.VITE_CDN_URL;
let cdn2 = import.meta.env.VITE_CDN_URL2;
let width = window.innerWidth, height = window.innerHeight;
let camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 1000 );

//let gui = new GUI();
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x05081c);

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.gammaOutput = true;

camera.position.set(-25, 20, 40);

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.324)
//gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.754)
moonLight.position.set(2.542, 5, -1.637)
scene.add(moonLight)


// ENTRANCE LIGHTS
const lightEntranceLeft1 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceLeft1)

const lightEntranceLeft2 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceLeft2)

const lightEntranceLeft3 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceLeft3)

const lightEntranceLeft4 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceLeft4)

const lightEntranceRight1 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceRight1)

const lightEntranceRight2 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceRight2)

const lightEntranceRight3 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceRight3)

const lightEntranceRight4 = new THREE.PointLight('#FFD700', 50, 50)
scene.add(lightEntranceRight4)



// RIGHT SIDE LANTERNS
const lightRightFront1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightFront1)

const lightRightBack1 = new THREE.PointLight('#FFD700',  500, 800)
scene.add(lightRightBack1)

const lightRightFront2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightFront2)

const lightRightBack2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightBack2)


// LEFT SIDE LANTERNS
const lightLeftFront1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftFront1)

const lightLeftBack1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftBack1)

const lightLeftFront2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftFront2)

const lightLeftBack2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftBack2)

const lightLeftFront3 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftFront3)

const lightLeftBack3 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftBack3)

const lightLeftFront4 = new THREE.PointLight('#FFD700', 800, 800)
scene.add(lightLeftFront4)

const lightLeftBack4 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftBack4)

const lightLeftStand1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftStand1)

const lightLeftStand2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftStand2)

const lightLeftStand3 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftStand3)

const lightRightStand1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightStand1)

const lightRightStand2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightStand2)

const lightRightStone1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightStone1)

const lightRightStone2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightRightStone2)

const lightLeftStone1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftStone1)

const lightLeftStone2 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightLeftStone2)

const lightMiddleStone1 = new THREE.PointLight('#FFD700', 500, 800)
scene.add(lightMiddleStone1)

/**
 * SHADOWS
 */
moonLight.castShadow = true

// ENTRANCE LIGHTS
lightEntranceLeft1.castShadow = false
lightEntranceLeft2.castShadow = false
lightEntranceLeft3.castShadow = false
lightEntranceLeft4.castShadow = false
lightEntranceRight1.castShadow = false
lightEntranceRight2.castShadow = false
lightEntranceRight3.castShadow = false
lightEntranceRight4.castShadow = false

lightEntranceLeft1.shadow.mapSize.width = 128
lightEntranceLeft1.shadow.mapSize.height = 128
lightEntranceLeft1.shadow.camera.far = 7

lightEntranceLeft2.shadow.mapSize.width = 128
lightEntranceLeft2.shadow.mapSize.height = 128
lightEntranceLeft2.shadow.camera.far = 7

lightEntranceLeft3.shadow.mapSize.width = 128
lightEntranceLeft3.shadow.mapSize.height = 128
lightEntranceLeft3.shadow.camera.far = 7

lightEntranceLeft4.shadow.mapSize.width = 128
lightEntranceLeft4.shadow.mapSize.height = 128
lightEntranceLeft4.shadow.camera.far = 7

lightEntranceRight1.shadow.mapSize.width = 128
lightEntranceRight1.shadow.mapSize.height = 128
lightEntranceRight1.shadow.camera.far = 7

lightEntranceRight2.shadow.mapSize.width = 128
lightEntranceRight2.shadow.mapSize.height = 128
lightEntranceRight2.shadow.camera.far = 7

lightEntranceRight3.shadow.mapSize.width = 128
lightEntranceRight3.shadow.mapSize.height = 128
lightEntranceRight3.shadow.camera.far = 7

lightEntranceRight4.shadow.mapSize.width = 128
lightEntranceRight4.shadow.mapSize.height = 128
lightEntranceRight4.shadow.camera.far = 7


// ENTRANCE LIGHTS
lightEntranceLeft1.position.set(-54.868, 18.878, 77.876)
lightEntranceLeft2.position.set(-49.952, 18.878, 65.585)
lightEntranceLeft3.position.set(-45.036, 20, 53.294)
lightEntranceLeft4.position.set(-45.036, 20, 53.294)
lightEntranceRight1.position.set(-47.494, 18.878, 82.792)
lightEntranceRight2.position.set(-42.577, 18.878, 70.501)
lightEntranceRight3.position.set(-35.203, 20, 60.668)
lightEntranceRight4.position.set(-35.203, 20, 60.668)

// RIGHT SIDE LATERNS
lightRightFront1.position.set(-13.089, 16.415, 40.999)
lightRightBack1.position.set(-8.169, 18.873, 23.79)

lightRightFront2.position.set(6.581, 18.871, 50.832)
lightRightBack2.position.set(11.498, 18.871, 36.082)


// LEFT SIDE LATERNS
lightLeftFront1.position.set(-37.67, 18.871, 26.248)
lightLeftBack1.position.set(-27.836, 16.415, 13.956)

lightLeftFront2.position.set(-54.878, 16.415, 13.956)
lightLeftBack2.position.set(-45.045, 18.871, 1.664)

lightLeftFront3.position.set(-67.17, 16.415, 4.123)
lightLeftBack3.position.set(-57.337, 18.871, -10.628)

lightLeftFront4.position.set(-81.921, 16.415, -3.252)
lightLeftBack4.position.set(-77.004, 18.871, -18.003)

// LIGHTS STANDS
lightLeftStand1.position.set(-25.378, 16.415, -3.252)
lightLeftStand2.position.set(-47.503, 11.498, -15.544)
lightLeftStand3.position.set(-67.17, 11.498, -25.378)

lightRightStand1.position.set(9.04, 16.415, 13.956)
lightRightStand2.position.set(26.248, 16.415, 28.707)

// LIGHTS STONES
lightRightStone1.position.set(38.54, 11.498, -27.836);
lightRightStone2.position.set(48.374, 11.498, -20.461);

lightLeftStone1.position.set(-22.919, 11.498, -64.712);
lightLeftStone2.position.set(-32.753, 11.498, -72.087);

lightMiddleStone1.position.set(28.707, 13.956, -74.546); 


let fog = new THREE.FogExp2("#05081c", 0.01)
scene.fog = fog

let controls = new OrbitControls( camera, renderer.domElement );

let forwardValue = 0;
let backwardValue = 0;
let rightValue = 0;
let leftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joystick;

controls.maxDistance = 12;
controls.minDistance = 6;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;
controls.rotateSpeed = 0.4;
controls.enableDamping = false;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;
controls.minAzimuthAngle = -Infinity; 
controls.maxAzimuthAngle = Infinity;

controls.update();

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    showLaunchScreen.value = true;
};

loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;

    document.querySelector('.progress').innerText = `${progress.toFixed(2)}%`;
    document.querySelector('.progress').style.width = `${progress.toFixed(2)}%`;
};

loadingManager.onLoad = function() {
  showLaunchScreen.value = false;

  setTimeout(() => {
    showPopinHow.value = true;
  }, 500)
};

let loader = new GLTFLoader(loadingManager);

let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( cdn + 'examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );


onMounted(() => {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        deviceName.value = 'mobile';
    } else {
        deviceName.value = 'desktop';
    }

    document.getElementById("map").appendChild(renderer.domElement);
    window.addEventListener('resize', resize);

    createModels();

    if(deviceName.value === 'mobile') {
      setTimeout(() => {
        addMobileJoystick();
      }, 200)
    }

    changeCharacterDirection();
    resize();

    animate();
})

function changeKeyboard(type) {
  keyboard.value = type;
  
  if(type === 'EU') {
    forwardKey.value = 90;
    leftKey.value = 81;
  }
  else {
    forwardKey.value = 87;
    leftKey.value = 65;
  }
}

function animate() {
    requestAnimationFrame(animate);
    
    if(walkModel !== undefined) {
      if(deviceName.value === 'mobile') {
        updatePlayer();
      }
      updatePlayerDesktop() 
    }

    if(mixer !== undefined) {
      mixer.update(0.1);
    }

    if(arrowLeftMixer !== undefined && arrowRightMixer !== undefined && arrowFrontMixer !== undefined) {
      arrowLeftMixer.update(0.025);
      arrowRightMixer.update(0.025);
      arrowFrontMixer.update(0.025);
    }

    if (wave) {
      const time = Date.now() * 0.001;
      const vertices = wave.geometry.attributes.position.array;

      for (let i = 0; i < vertices.length; i += 3) {
          vertices[i + 1] = Math.sin(vertices[i] + vertices[i + 2] + time);
      }
      
      wave.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render( scene, camera );
}

let sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7, sprite8, sprite9, sprite10, sprite11, sprite12, sprite13, sprite14
let spriteRight1, spriteRight2, spriteRight3, spriteRight4, spriteRight5, spriteRight6, spriteRight7;  
let spriteStone1, spriteStone2, spriteStone3, spriteStone4, spriteStone5;

function createClickStandsLeftSide() {
  let  map = new THREE.TextureLoader().load( cdn2 + "left-click.png" );
  map.crossOrigin = null

  let material = new THREE.SpriteMaterial( { map: map, color: 0xffffff });

  sprite1 = new THREE.Sprite( material );
  sprite1.position.set(-22.919, 9.04, 9.04);
  sprite1.scale.set(3, 3, 3);

  scene.add( sprite1 );

  sprite2 = new THREE.Sprite( material );
  sprite2.position.set(-31.114, 9.04, 6);
  sprite2.scale.set(3, 3, 3);

  scene.add( sprite2 );

  sprite3 = new THREE.Sprite( material );
  sprite3.position.set(-38.489, 9.04, 0.845);
  sprite3.scale.set(3, 3, 3);

  scene.add( sprite3 );

  sprite4 = new THREE.Sprite( material );
  sprite4.position.set(-45.864, 9.04, -4.072);
  sprite4.scale.set(3, 3, 3);

  scene.add( sprite4 );

  sprite5 = new THREE.Sprite( material );
  sprite5.position.set(-53.24, 9.04, -8.989);
  sprite5.scale.set(3, 3, 3);

  scene.add( sprite5 );

  sprite6 = new THREE.Sprite( material );
  sprite6.position.set(-60.615, 9.04, -16.364);
  sprite6.scale.set(3, 3, 3);

  scene.add( sprite6 );

  sprite7 = new THREE.Sprite( material );
  sprite7.position.set(-67.99, 9.04, -18.822);
  sprite7.scale.set(3, 3, 3);

  scene.add( sprite7 );

  sprite8 = new THREE.Sprite( material );
  sprite8.position.set(-13.905, 9.04, -6.53);
  sprite8.scale.set(3, 3, 3);

  scene.add( sprite8 );

  sprite9 = new THREE.Sprite( material );
  sprite9.position.set(-21.5, 9.04, -11.447);
  sprite9.scale.set(3, 3, 3);

  scene.add( sprite9 );

  sprite10 = new THREE.Sprite( material );
  sprite10.position.set(-28.656, 9.04, -16.364);
  sprite10.scale.set(3, 3, 3);

  scene.add( sprite10 );

  sprite11 = new THREE.Sprite( material );
  sprite11.position.set(-36.031, 9.04, -21.281);
  sprite11.scale.set(3, 3, 3);

  scene.add( sprite11 );

  sprite12 = new THREE.Sprite( material );
  sprite12.position.set(-43.406, 9.04, -26.197);
  sprite12.scale.set(3, 3, 3);

  scene.add( sprite12 );

  sprite13 = new THREE.Sprite( material );
  sprite13.position.set(-50.781, 9.04, -31.114);
  sprite13.scale.set(3, 3, 3);

  scene.add( sprite13 );

  sprite14 = new THREE.Sprite( material );
  sprite14.position.set(-58.156, 9.04, -36.031);
  sprite14.scale.set(3, 3, 3);

  scene.add( sprite14 );
}

function createClickStandsRightSide() {
  let  map = new THREE.TextureLoader().load(cdn2 + "left-click.png" );

  let material = new THREE.SpriteMaterial( { map: map, color: 0xffffff });
 
  spriteRight1 = new THREE.Sprite( material );
  spriteRight1.position.set(0.3, 9.04, 20.512);
  spriteRight1.scale.set(3, 3, 3);

  scene.add( spriteRight1 );

  spriteRight2 = new THREE.Sprite( material );
  spriteRight2.position.set(8.2, 9.04, 8.22);
  spriteRight2.scale.set(3, 3, 3);

  scene.add( spriteRight2 );

  spriteRight3 = new THREE.Sprite( material );
  spriteRight3.position.set(8.22, 9.04, 25.429);
  spriteRight3.scale.set(3, 3, 3);

  scene.add( spriteRight3 );

  spriteRight4 = new THREE.Sprite( material );
  spriteRight4.position.set(17, 9.04, 13.137);
  spriteRight4.scale.set(3, 3, 3);

  scene.add( spriteRight4 );

  spriteRight5 = new THREE.Sprite( material );
  spriteRight5.position.set(25.429, 9.04, 18.054);
  spriteRight5.scale.set(3, 3, 3);

  scene.add( spriteRight5 );

  spriteRight6 = new THREE.Sprite( material );
  spriteRight6.position.set(17, 9.04, 31.2);
  spriteRight6.scale.set(3, 3, 3);

  scene.add( spriteRight6 );

  spriteRight7 = new THREE.Sprite( material );
  spriteRight7.position.set(25.429, 9.04, 35.262);
  spriteRight7.scale.set(3, 3, 3);

  scene.add( spriteRight7 );
}

function createClickStones() {
  let  map = new THREE.TextureLoader().load(cdn2 + "left-click.png" );
  let material = new THREE.SpriteMaterial( { map: map, color: 0xffffff });
 
  spriteStone1 = new THREE.Sprite( material );
  spriteStone1.position.set(40, 9.56, -27.5);
  spriteStone1.scale.set(3, 3, 3);

  scene.add( spriteStone1 );

  spriteStone2 = new THREE.Sprite( material );
  spriteStone2.position.set(50.013, 9.56, -21.281);
  spriteStone2.scale.set(3, 3, 3);

  scene.add( spriteStone2 );

  spriteStone3 = new THREE.Sprite( material );
  spriteStone3.position.set(29.346, 10.137, -77.824);
  spriteStone3.scale.set(3, 3, 3);

  scene.add( spriteStone3 );

  spriteStone4 = new THREE.Sprite( material );
  spriteStone4.position.set(-21.281, 9.56, -65.532);
  spriteStone4.scale.set(3, 3, 3);

  scene.add( spriteStone4 );

  spriteStone5 = new THREE.Sprite( material );
  spriteStone5.position.set(-32, 9.56, -72);
  spriteStone5.scale.set(3, 3, 3);

  scene.add( spriteStone5 );
}

function createTextStandsLeftSide() {
  const loader = new FontLoader();
  let standLeft1Geometry, standLeft2Geometry, standLeft3Geometry, standLeft4Geometry, standLeft5Geometry, standLeft6Geometry, standLeft7Geometry;
  let standRight1Geometry, standRight2Geometry, standRight3Geometry, standRight4Geometry, standRight5Geometry, standRight6Geometry, standRight7Geometry;
  let textLeft1Mesh, textLeft2Mesh, textLeft3Mesh, textLeft4Mesh, textLeft5Mesh, textLeft6Mesh, textLeft7Mesh;
  let textRight1Mesh, textRight2Mesh, textRight3Mesh, textRight4Mesh, textRight5Mesh, textRight6Mesh, textRight7Mesh;

  loader.load(cdn + "fonts/Apothem_Bold.json", function (font) {

    // STANDS 1
    standLeft1Geometry = new TextGeometry( "Viami", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textLeft1Mesh = new THREE.Mesh(standLeft1Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft1Mesh.castShadow = true;
    textLeft1Mesh.position.set(-22.2, 12.2, 11);
    textLeft1Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft1Mesh)

    standRight1Geometry = new TextGeometry( "VivaTech", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight1Mesh = new THREE.Mesh(standRight1Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight1Mesh.castShadow = true;
    textRight1Mesh.position.set(-14.2, 12.6, -10.5);
    textRight1Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight1Mesh)

    // STANDS 2
    standLeft2Geometry = new TextGeometry( "Timer", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textLeft2Mesh = new THREE.Mesh(standLeft2Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft2Mesh.castShadow = true;
    textLeft2Mesh.position.set(-29.8, 12.2, 6);
    textLeft2Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft2Mesh)

    standRight2Geometry = new TextGeometry( "Space-X", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight2Mesh = new THREE.Mesh(standRight2Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textRight2Mesh.castShadow = true;
    textRight2Mesh.position.set(-21.5, 12.6, -15.2);
    textRight2Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight2Mesh)

    // STANDS 3
    standLeft3Geometry = new TextGeometry( "Reuninou", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textLeft3Mesh = new THREE.Mesh(standLeft3Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft3Mesh.castShadow = true;
    textLeft3Mesh.position.set(-36, 12.4, 2);
    textLeft3Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft3Mesh)

    standRight3Geometry = new TextGeometry( "Net'radio", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight3Mesh = new THREE.Mesh(standRight3Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight3Mesh.castShadow = true;
    textRight3Mesh.position.set(-29, 12.6, -20.2);
    textRight3Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight3Mesh)

    // STANDS 4
    standLeft4Geometry = new TextGeometry( "Bicycle", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textLeft4Mesh = new THREE.Mesh(standLeft4Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft4Mesh.castShadow = true;
    textLeft4Mesh.position.set(-44, 12.4, -3.3);
    textLeft4Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft4Mesh)

    standRight4Geometry = new TextGeometry( "Beehoneyst", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight4Mesh = new THREE.Mesh(standRight4Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight4Mesh.castShadow = true;
    textRight4Mesh.position.set(-37, 12.6, -25.7);
    textRight4Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight4Mesh)

    // STANDS 5
    standLeft5Geometry = new TextGeometry( "Coronavirus App", {
      font: font,
      size: 0.65,
      height: 0.6
    })

    textLeft5Mesh = new THREE.Mesh(standLeft5Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textLeft5Mesh.castShadow = true;
    textLeft5Mesh.position.set(-50.4, 12.8, -7.6);
    textLeft5Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft5Mesh)

    standRight5Geometry = new TextGeometry( "Media Library App", {
      font: font,
      size: 0.65,
      height: 0.6
    })

    textRight5Mesh = new THREE.Mesh(standRight5Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textRight5Mesh.castShadow = true;
    textRight5Mesh.position.set(-44.7, 12.6, -30.6);
    textRight5Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight5Mesh)

    // STANDS 6
    standLeft6Geometry = new TextGeometry( "Museum Maritime", {
      font: font,
      size: 0.7,
      height: 0.6
    })

    textLeft6Mesh = new THREE.Mesh(standLeft6Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft6Mesh.castShadow = true;
    textLeft6Mesh.position.set(-57.5, 12.4, -12.5);
    textLeft6Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft6Mesh)

    standRight6Geometry = new TextGeometry( "Breakout", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight6Mesh = new THREE.Mesh(standRight6Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight6Mesh.castShadow = true;
    textRight6Mesh.position.set(-51, 12.6, -34.8);
    textRight6Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight6Mesh)

    // STANDS 7
    standLeft7Geometry = new TextGeometry( "lehangar.local", {
      font: font,
      size: 0.85,
      height: 0.65
    })

    textLeft7Mesh = new THREE.Mesh(standLeft7Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textLeft7Mesh.castShadow = true;
    textLeft7Mesh.position.set(-65.5, 12.6, -17.5);
    textLeft7Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft7Mesh)

    standRight7Geometry = new TextGeometry( "Franck Picci's Music", {
      font: font,
      size: 0.55,
      height: 0.5
    })

    textRight7Mesh = new THREE.Mesh(standRight7Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight7Mesh.castShadow = true;
    textRight7Mesh.position.set(-59.1, 12.9, -40.1);
    textRight7Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight7Mesh)
  })
}

function createTextStandsRightSide() {
  const loader = new FontLoader();
  let standLeft1Geometry, standLeft2Geometry, standLeft3Geometry, standLeft4Geometry;
  let standRight1Geometry, standRight2Geometry, standRight3Geometry, standRight4Geometry;
  let textLeft1Mesh, textLeft2Mesh, textLeft3Mesh, textLeft4Mesh;
  let textRight1Mesh, textRight2Mesh, textRight3Mesh, textRight4Mesh;

  loader.load(cdn + "fonts/Apothem_Bold.json", function (font) {

    // STANDS 1
    standLeft1Geometry = new TextGeometry( "AI Blob ³D", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textLeft1Mesh = new THREE.Mesh(standLeft1Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textLeft1Mesh.castShadow = true;
    textLeft1Mesh.position.set(0.4, 12.4, 24.2);
    textLeft1Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft1Mesh)

    standRight1Geometry = new TextGeometry( "Tree ³D", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight1Mesh = new THREE.Mesh(standRight1Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight1Mesh.castShadow = true;
    textRight1Mesh.position.set(8.2, 12.4, 4.2);
    textRight1Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight1Mesh)

    // STANDS 2
    standLeft2Geometry = new TextGeometry( "Shiba Inu ³D", {
      font: font,
      size: 0.75,
      height: 0.7
    })

    textLeft2Mesh = new THREE.Mesh(standLeft2Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft2Mesh.castShadow = true;
    textLeft2Mesh.position.set(8.7, 12.1, 30);
    textLeft2Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft2Mesh)

    standRight2Geometry = new TextGeometry( "Don't eat the salad", {
      font: font,
      size: 0.55,
      height: 0.5
    })

    textRight2Mesh = new THREE.Mesh(standRight2Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight2Mesh.castShadow = true;
    textRight2Mesh.position.set(16.1, 12.4,  9.7);
    textRight2Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight2Mesh)

    // STANDS 3
    standLeft3Geometry = new TextGeometry( "Zombie Attack", {
      font: font,
      size: 0.75,
      height: 0.7
    })

    textLeft3Mesh = new THREE.Mesh(standLeft3Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft3Mesh.castShadow = true;
    textLeft3Mesh.position.set(17.6, 12.3, 35.7);
    textLeft3Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft3Mesh)

    standRight3Geometry = new TextGeometry( "Rock paper scissors", {
      font: font,
      size: 0.55,
      height: 0.5
    })

    textRight3Mesh = new THREE.Mesh(standRight3Geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}), new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    textRight3Mesh.castShadow = true;
    textRight3Mesh.position.set(23.9, 12.4,  14.7);
    textRight3Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight3Mesh)

    // STANDS 4
    standLeft4Geometry = new TextGeometry( "Word search", {
      font: font,
      size: 0.8,
      height: 0.75
    })

    textLeft4Mesh = new THREE.Mesh(standLeft4Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft4Mesh.castShadow = true;
    textLeft4Mesh.position.set(26, 12.1, 41.2);
    textLeft4Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft4Mesh)
  })
}

function createTextCategory() {
  const loader = new FontLoader();
  let standLeftGeometry, standRightGeometry, professionalGeometry, experienceGeometry, aboutGeometry, skillGeometry, educationGeometry, socmedGeometry;
  let textLeftMesh, textRightMesh, textProfessionalMesh, textExperienceMesh, textAboutMesh, textSkillMesh, textEducationMesh, textSocmedMesh;

  loader.load(cdn + "fonts/Apothem_Bold.json", function (font) {

    // STANDS LEFT SIDE
    standLeftGeometry = new TextGeometry( "PROJECTS", {
      font: font,
      size: 2,
      height: 1.9
    })

    textLeftMesh = new THREE.Mesh(standLeftGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textLeftMesh.castShadow = true;
    textLeftMesh.position.set(-17, 16, 8.2);
    textLeftMesh.rotation.set(0, 1, 0);

    scene.add(textLeftMesh)

    // STANDS RIGHT SIDE
    standRightGeometry = new TextGeometry( "R&D", {
      font: font,
      size: 2,
      height: 1.9
    })

    textRightMesh = new THREE.Mesh(standRightGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textRightMesh.castShadow = true;
    textRightMesh.position.set(0.4, 16, 9.2);
    textRightMesh.rotation.set(0, -2.2, 0);

    scene.add(textRightMesh)

    // EXPERIENCES
    professionalGeometry = new TextGeometry( "PROFESSIONAL", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textProfessionalMesh = new THREE.Mesh(professionalGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textProfessionalMesh.castShadow = true;
    textProfessionalMesh.position.set(39, 14, -31.2);
    textProfessionalMesh.rotation.set(0, -0.6, 0);

    scene.add(textProfessionalMesh)

    experienceGeometry = new TextGeometry( "EXPERIENCES", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textExperienceMesh = new THREE.Mesh(experienceGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textExperienceMesh.castShadow = true;
    textExperienceMesh.position.set(39, 13, -31.2);
    textExperienceMesh.rotation.set(0, -0.6, 0);

    scene.add(textExperienceMesh)

    // ABOUT ME
    aboutGeometry = new TextGeometry( "ABOUT ME", {
      font: font,
      size: 2,
      height: 1.9
    })

    textAboutMesh = new THREE.Mesh(aboutGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textAboutMesh.castShadow = true;
    textAboutMesh.position.set(29, 12, -88.2);
    textAboutMesh.rotation.set(0, -0.6, 0);

    scene.add(textAboutMesh)

    // COMPETENCES & SKILLS
    skillGeometry = new TextGeometry( "COMPETENCES & SKILLS", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textSkillMesh = new THREE.Mesh(skillGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textSkillMesh.castShadow = true;
    textSkillMesh.position.set(48, 13, -25.2);
    textSkillMesh.rotation.set(0, -0.6, 0);

    scene.add(textSkillMesh)

    // EDUCATION
    educationGeometry = new TextGeometry( "EDUCATION", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textEducationMesh = new THREE.Mesh(educationGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textEducationMesh.castShadow = true;
    textEducationMesh.position.set(-20.3, 13, -69.2);
    textEducationMesh.rotation.set(0, -0.6, 0);

    scene.add(textEducationMesh)

    // SOCIAL MEDIAS
    socmedGeometry = new TextGeometry( "CONTACT & LINKS", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textSocmedMesh = new THREE.Mesh(socmedGeometry, new THREE.MeshPhongMaterial({color: 0xFF7F00}), new THREE.MeshPhongMaterial({color: 0xFF7F00}));

    textSocmedMesh.castShadow = true;
    textSocmedMesh.position.set(-31.8, 13, -77.2);
    textSocmedMesh.rotation.set(0, -0.6, 0);

    scene.add(textSocmedMesh)
  })
}


function createModels() {

    loader.load(cdn + 'models/map.glb', function ( gltf ) {

        mapModel = gltf.scene;
        mapModel.scale.set(0.5, 0.5, 0.5); 
        mapModel.position.set(0, 0, 0); 
        mapModel.rotation.set(0, 1, 0);
        
        scene.add(mapModel);

        wave = mapModel.children[0];
        bridge1 = mapModel.children[58];
        bridge2 = mapModel.children[59];
        bridge3 = mapModel.children[60];
        bridge4 = mapModel.children[61];

        console.log(mapModel)

        bridgeHandleR2 = mapModel.children[70];
        bridgeHandleR3 = mapModel.children[71];
        bridgeHandleL2 = mapModel.children[72];
        bridgeHandleL3 = mapModel.children[73];
        bridgeHandleR4 = mapModel.children[74];
        bridgeHandleL4 = mapModel.children[75];
        bridgeHandleL1 = mapModel.children[76];
        bridgeHandleR1 = mapModel.children[77];

        loader.load(cdn + 'models/tania_walking.glb', function (gltf) {

          walkModel = gltf.scene;
          walkModel.scale.set(0.8, 0.8, 0.8); 
          walkModel.position.set(-56.5, 5, 85); 
          walkModel.rotation.set(0, -3.5, 0);

          scene.add(walkModel);

          mixer = new THREE.AnimationMixer(walkModel);

          walk = mixer.clipAction(gltf.animations[0]);
        })

        loader.load(cdn + 'models/arrowLeft.glb', function ( gltf ) {

          arrowLeftModel = gltf.scene;
          arrowLeftModel.scale.set(0.7, 0.7, 0.7); 
          arrowLeftModel.position.set(-17, 5, 1);
          arrowLeftModel.rotation.set(0, 1, 0);

          scene.add(arrowLeftModel);

          arrowLeftMixer = new THREE.AnimationMixer(arrowLeftModel);
          pointingArrowLeft = arrowLeftMixer.clipAction(gltf.animations[0]);

          pointingArrowLeft.play();

          }); 

        loader.load(cdn + 'models/arrowRight.glb', function ( gltf ) {

          arrowRightModel = gltf.scene;
          arrowRightModel.scale.set(0.7, 0.7, 0.7); 
          arrowRightModel.position.set(0, 5, 12);
          arrowRightModel.rotation.set(0, -2.1, 0);

          scene.add(arrowRightModel);

          arrowRightMixer = new THREE.AnimationMixer(arrowRightModel);
          pointingArrowRight = arrowRightMixer.clipAction(gltf.animations[0]);

          pointingArrowRight.play();

          }); 

        loader.load(cdn + 'models/arrowFront.glb', function ( gltf ) {

          arrowFrontModel = gltf.scene;
          arrowFrontModel.scale.set(0.7, 0.7, 0.7); 
          arrowFrontModel.position.set(0.5, 5, -5); 
          arrowFrontModel.rotation.set(0, -2.1, 0);

          scene.add(arrowFrontModel);

          arrowFrontMixer = new THREE.AnimationMixer(arrowFrontModel);
          pointingArrowFront = arrowFrontMixer.clipAction(gltf.animations[0]);

          pointingArrowFront.play();
        }); 


        createTextStandsLeftSide();
        createTextStandsRightSide();
        createTextCategory();
        createClickStandsLeftSide();
        createClickStandsRightSide();
        createClickStones();
    });
}

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function detectCollision(modelMesh, otherMesh) {
    const modelBox = new THREE.Box3().setFromObject(modelMesh);
    const otherBox = new THREE.Box3().setFromObject(otherMesh);

    if (modelBox.intersectsBox(otherBox)) {
        return true;
    } else {
        return false;
    }
}

function detectClickCollision(modelMesh, otherMesh) {
    // Set up the bounding boxes for both meshes
    const modelBox = new THREE.Box3().setFromObject(modelMesh);
    const otherBox = new THREE.Box3().setFromObject(otherMesh);

    // Calculate the distance between the centers of the two bounding boxes
    const modelCenter = modelBox.getCenter(new THREE.Vector3());
    const otherCenter = otherBox.getCenter(new THREE.Vector3());
    const distance = modelCenter.distanceTo(otherCenter);

    // Adjust the actual distance by considering the extent of the bounding boxes
    // We subtract half the size of each box along each axis to account for the actual closest surfaces
    const sizeModel = new THREE.Vector3();
    const sizeOther = new THREE.Vector3();
    modelBox.getSize(sizeModel);
    otherBox.getSize(sizeOther);

    let distanceThreshold = 1.2;
    // Calculate adjusted distance
    let adjustedDistance = distance;
    adjustedDistance -= sizeModel.length() / 2;
    adjustedDistance -= sizeOther.length() / 2;

    // Check if the adjusted distance is less than or equal to the threshold
    if (adjustedDistance <= distanceThreshold) {
        return true;
    } else {
        return false;
    }
}

function detectObjectCollision(modelMesh, otherMesh, adjust) {
    // Set up the bounding boxes for both meshes
    const modelBox = new THREE.Box3().setFromObject(modelMesh);
    const otherBox = new THREE.Box3().setFromObject(otherMesh);

    // Calculate the distance between the centers of the two bounding boxes
    const modelCenter = modelBox.getCenter(new THREE.Vector3());
    const otherCenter = otherBox.getCenter(new THREE.Vector3());
    const distance = modelCenter.distanceTo(otherCenter);

    // Adjust the actual distance by considering the extent of the bounding boxes
    // We subtract half the size of each box along each axis to account for the actual closest surfaces
    const sizeModel = new THREE.Vector3();
    const sizeOther = new THREE.Vector3();
    modelBox.getSize(sizeModel);
    otherBox.getSize(sizeOther);

    let distanceThreshold = 0;
    // Calculate adjusted distance
    let adjustedDistance = distance;
    adjustedDistance -= sizeModel.length() / adjust;
    adjustedDistance -= sizeOther.length() / adjust;

    // Check if the adjusted distance is less than or equal to the threshold
    if (adjustedDistance <= distanceThreshold) {
        return true;
    } else {
        return false;
    }
}


function updatePlayer(){
    const angle = controls.getAzimuthalAngle();

    if (detectCollision(walkModel, bridge1) === true && walkModel.position.y <= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 2.3) {
      walkModel.position.y = walkModel.position.y + (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 50; 
    }
    else if (detectCollision(walkModel, bridge2) === true && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.2) {
      walkModel.position.y = walkModel.position.y + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50; 
    }
    else if (detectCollision(walkModel, bridge3) === true && detectCollision(walkModel, bridge4) === false && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.3) {
      walkModel.position.y = (walkModel.position.y + 2) + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
    }
    else if(detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true && walkModel.position.y >= (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 1.7){
      walkModel.position.y = walkModel.position.y - (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 50;
    }

    if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false && detectObjectCollision(walkModel, mapModel.children[200], 5.1) === false && detectObjectCollision(walkModel, mapModel.children[199], 4.7) === false){
      walkModel.position.y = 5.5;
    }
    
    if (forwardValue > 0) {
      if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.6) {
          tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) /3.6
        ) {
          tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
          else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.6
        ) {
          tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.6
        ) {
          tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()
          }
          else {
            tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()          
          }
        }
    }
  
    if (backwardValue > 0) {
      if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.47
        ) {
          tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) / 3.5
        ) {
          tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
          else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.47
        ) {
          tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.45
        ) {
          tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()
        }
        else 
        {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()
          }
          else {
            tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()          
          }
        }
    }

    if (leftValue > 0) {

      if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.65) {
          tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()  
        }
        else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) / 3.65) {
          tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()  
        }
          else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.65) {
          tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()  
        }
        else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.65) {
          tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.4)
          walk.play()  
        }
        else {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()   
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()   
          }
          else {
            tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.4)
            walk.play()        
          }     
        }

    }

    if (rightValue > 0) {

      if (detectCollision(walkModel, bridgeHandleR1) === true
          && walkModel.position.x <= (bridgeHandleR1.position.x + bridgeHandleR1.geometry.boundingBox.max.x) / 3.87
        ) {
          tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.3)
          walk.play()
        }
        else if (detectCollision(walkModel, bridgeHandleR2) === true
          && walkModel.position.x <= (bridgeHandleR2.position.x + bridgeHandleR2.geometry.boundingBox.max.x) / 3.87
        ) {
          tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.3)
          walk.play()
        }
        else if (detectCollision(walkModel, bridgeHandleR3) === true
          && walkModel.position.x <= (bridgeHandleR3.position.x + bridgeHandleR3.geometry.boundingBox.max.x) / 3.87
        ) {
          tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.3)
          walk.play()
        }
        else if (detectCollision(walkModel, bridgeHandleR4) === true
          && walkModel.position.x <= (bridgeHandleR4.position.x + bridgeHandleR4.geometry.boundingBox.max.x) / 3.87
        ) {
          tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
          walkModel.position.addScaledVector(tempVector, 0.3)
          walk.play()
        }
        else {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.3)
            walk.play()     
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.3)
            walk.play()     
          }
          else {
            tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
            walkModel.position.addScaledVector(tempVector, 0.3)
            walk.play()         
          }        
        }
    }
  
    camera.position.sub(controls.target)
    controls.target.copy(walkModel.position)
    camera.position.add(walkModel.position)

};

  
function updatePlayerDesktop() {
 
  document.onkeydown = ((event) => {
      // Move forward
      if(event.keyCode === forwardKey.value) {
        
        if (detectCollision(walkModel, bridge1) === true && walkModel.position.y <= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = walkModel.position.y + (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 100; 
        }
        else if (detectCollision(walkModel, bridge2) === true && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge3) === true && detectCollision(walkModel, bridge4) === false && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = (walkModel.position.y + 2) + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
        }
        else if(detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true && walkModel.position.y >= (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 1.7){
          walkModel.position.y = walkModel.position.y - (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 50;
        }

        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false && detectObjectCollision(walkModel, mapModel.children[200], 5.1) === false && detectObjectCollision(walkModel, mapModel.children[199], 4.7) === false){
          walkModel.position.y = 5.5;
        }

        walk.play();

        if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.6
        ) {
          walkModel.position.z = walkModel.position.z + 0.1;
          walkModel.position.y = walkModel.position.y - 0.05;  

        }
        else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) /3.6
        ) {
          walkModel.position.z = walkModel.position.z + 0.1;
          walkModel.position.y = walkModel.position.y - 0.05;  
        }
          else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.6
        ) {
          walkModel.position.z = walkModel.position.z + 0.1;
          walkModel.position.y = walkModel.position.y - 0.05;  

        }
        else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.6
        ) {
          walkModel.position.z = walkModel.position.z + 0.1;
          walkModel.position.y = walkModel.position.y - 0.05;  
        }
        else 
        {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            walkModel.translateZ(0.6);
            walkModel.translateX(-0.1);  
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            walkModel.translateZ(0.6);
            walkModel.translateX(-0.1);  
          }
          else {
            walkModel.translateZ(0.6);
            walkModel.translateX(-0.1);  
          }
        }
        
      }
      // Move to the right
      else if(event.keyCode === 68) {
        if (detectCollision(walkModel, bridge1) === true && walkModel.position.y <= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = walkModel.position.y + (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 100; 
        }
        else if (detectCollision(walkModel, bridge2) === true && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge3) === true && detectCollision(walkModel, bridge4) === false && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = (walkModel.position.y + 2) + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
        }
        else if(detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true && walkModel.position.y >= (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 1.7){
          walkModel.position.y = walkModel.position.y - (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 50;
        }
        

        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false && detectObjectCollision(walkModel, mapModel.children[200], 5.1) === false && detectObjectCollision(walkModel, mapModel.children[199], 4.7) === false){
          walkModel.position.y = 5.5;
        }

        walk.play();

        if (detectCollision(walkModel, bridgeHandleR1) === true
          && walkModel.position.x >= (bridgeHandleR1.position.x + bridgeHandleR1.geometry.boundingBox.max.x) / 3.87
        ) {}
        else if (detectCollision(walkModel, bridgeHandleR2) === true
          && walkModel.position.x >= (bridgeHandleR2.position.x + bridgeHandleR2.geometry.boundingBox.max.x) / 3.87
        ) {}
        else if (detectCollision(walkModel, bridgeHandleR3) === true
          && walkModel.position.x >= (bridgeHandleR3.position.x + bridgeHandleR3.geometry.boundingBox.max.x) / 3.87
        ) {}
        else if (detectCollision(walkModel, bridgeHandleR4) === true
          && walkModel.position.x >= (bridgeHandleR4.position.x + bridgeHandleR4.geometry.boundingBox.max.x) / 3.87
        ) {}
        else {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            walkModel.translateX(-0.5);
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            walkModel.translateX(-0.5);
          }
          else {
            walkModel.translateX(-0.5);
          }
        }

      }
      // Move to the left
      else if(event.keyCode === leftKey.value) {
        if (detectCollision(walkModel, bridge1) === true && walkModel.position.y <= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = walkModel.position.y + (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 100; 
        }
        else if (detectCollision(walkModel, bridge2) === true && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge3) === true && detectCollision(walkModel, bridge4) === false && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = (walkModel.position.y + 2) + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
        }
        else if(detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true && walkModel.position.y >= (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 1.7){
          walkModel.position.y = walkModel.position.y - (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 50;
        }
        
        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false && detectObjectCollision(walkModel, mapModel.children[200], 5.1) === false && detectObjectCollision(walkModel, mapModel.children[199], 4.7) === false){
          walkModel.position.y = 5.5;
        }

        walk.play();

        if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.65
        ) {
        }
        else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) / 3.65
        ) {}
          else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.65
        ) {}
        else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.65
        ) {}
        else
        {
          if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
            walkModel.position.y = 7.5
            walkModel.translateX(0.5);
          }
          else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
            walkModel.position.y = 6.5
            walkModel.translateX(0.5);
          }
          else {
            walkModel.translateX(0.5);
          }
        }
      }
      // Move backward
      else if(event.keyCode === 83) {
          walk.play();

          if (detectCollision(walkModel, bridgeHandleL1) === true && walkModel.position.x <= (bridgeHandleL1.position.x + bridgeHandleL1.geometry.boundingBox.max.x) / 3.47
          ) {}
          else if(detectCollision(walkModel, bridgeHandleL3) === true && walkModel.position.x <= (bridgeHandleL3.position.x + bridgeHandleL3.geometry.boundingBox.max.x) / 3.5
          ) {}
            else if(detectCollision(walkModel, bridgeHandleL2) === true && walkModel.position.x <= (bridgeHandleL2.position.x + bridgeHandleL2.geometry.boundingBox.max.x) / 3.47
          ) {}
          else if(detectCollision(walkModel, bridgeHandleL4) === true && walkModel.position.x <= (bridgeHandleL4.position.x + bridgeHandleL4.geometry.boundingBox.max.x) / 3.45
          ) {}
          else 
          {
            if(detectObjectCollision(walkModel, mapModel.children[200], 5.1) === true) {
              walkModel.position.y = 7.5
              walkModel.translateX(0.1);          
              walkModel.translateZ(-0.6);
            }
            else if(detectObjectCollision(walkModel, mapModel.children[199], 4.7) === true) {
              walkModel.position.y = 6.5
              walkModel.translateX(0.1);    
              walkModel.translateZ(-0.6);      
            }
            else {
              walkModel.translateX(0.1); 
              walkModel.translateZ(-0.6);         
            }
          }

        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false && detectObjectCollision(walkModel, mapModel.children[200], 5.1) === false && detectObjectCollision(walkModel, mapModel.children[199], 4.7) === false){
          walkModel.position.y = 5.5;
        }
                  
        if(detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true && walkModel.position.y <= (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 1.6){
          walkModel.position.y = walkModel.position.y + (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 80;
        }
        else if (detectCollision(walkModel, bridge3) === true && detectCollision(walkModel, bridge4) === false && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y  + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge2) && detectCollision(walkModel, bridge3) === false && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.3) {
          walkModel.position.y = (walkModel.position.y + 2) + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50;
        }
        else if(detectCollision(walkModel, bridge1)  && walkModel.position.y >= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 1.6){
          walkModel.position.y = walkModel.position.y - (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 50;
        }
      }
      // Click the object
      else if(event.keyCode === 32){        

        if(detectClickCollision(walkModel, sprite1) == true) {
          // Viami
          showPopin.value = true;
          openPopin.value = 0;
        }
        else if(detectClickCollision(walkModel, sprite2) == true) {
          // Timer
          showPopin.value = true;
          openPopin.value = 2;
        }
        else if(detectClickCollision(walkModel, sprite3) == true) {
          // Reuninou
          showPopin.value = true;
          openPopin.value = 4;
        }
        else if(detectClickCollision(walkModel, sprite4) == true) {
          // Bicycle
          showPopin.value = true;
          openPopin.value = 5;
        }
        else if(detectClickCollision(walkModel, sprite5) == true) {
          // Covid
          showPopin.value = true;
          openPopin.value = 7;
        }
        else if(detectClickCollision(walkModel, sprite6) == true) {
          // Museum maritime
          showPopin.value = true;
          openPopin.value = 8;
        }
        else if(detectClickCollision(walkModel, sprite7) == true) {
          // Lehangar.local
          showPopin.value = true;
          openPopin.value = 12;
        }
        else if(detectClickCollision(walkModel, sprite8) == true) {
          showPopin.value = true;
          openPopin.value = 1;
        }
        else if(detectClickCollision(walkModel, sprite9) == true) {
          showPopin.value = true;
          openPopin.value = 3;
        }
        else if(detectClickCollision(walkModel, sprite10) == true) {
          showPopin.value = true;
          openPopin.value = 6;
        }
        else if(detectClickCollision(walkModel, sprite11) == true) {
          showPopin.value = true;
          openPopin.value = 9;
        }
        else if(detectClickCollision(walkModel, sprite12) == true) {
          showPopin.value = true;
          openPopin.value = 10;
        }
        else if(detectClickCollision(walkModel, sprite13) == true) {
          showPopin.value = true;
          openPopin.value = 11;
        }
        else if(detectClickCollision(walkModel, sprite14) == true) {
          showPopin.value = true;
          openPopin.value = 13;
        }
        else if(detectClickCollision(walkModel, spriteRight1) == true) {
          showPopinRD.value = true;
          openPopin.value = 0;
        }
        else if(detectClickCollision(walkModel, spriteRight2) == true) {
          showPopinRD.value = true;
          openPopin.value = 1;
        }
        else if(detectClickCollision(walkModel, spriteRight3) == true) {
          showPopinRD.value = true;
          openPopin.value = 5;
        }
        else if(detectClickCollision(walkModel, spriteRight4) == true) {
          showPopinRD.value = true;
          openPopin.value = 4;
        }
        else if(detectClickCollision(walkModel, spriteRight5) == true) {
          showPopinRD.value = true;
          openPopin.value = 3;
        }
        else if(detectClickCollision(walkModel, spriteRight6) == true) {
          showPopinRD.value = true;
          openPopin.value = 6;
        }
        else if(detectClickCollision(walkModel, spriteRight7) == true) {
          showPopinRD.value = true;
          openPopin.value = 2;
        }
        else if(detectClickCollision(walkModel, spriteStone1) == true) {
          showPopinExperience.value = true;
        }
        else if(detectClickCollision(walkModel, spriteStone2) == true) {
          showPopinSkill.value = true;
        }
        else if(detectClickCollision(walkModel, spriteStone3) == true) {
          showPopinAboutMe.value = true;
        }
        else if(detectClickCollision(walkModel, spriteStone4) == true) {
          showPopinEducation.value = true;
        }
        else if(detectClickCollision(walkModel, spriteStone5) == true) {
          showPopinMedSoc.value = true;
        }
      }
    })

    document.onkeyup = ((event) => {
      if(event.keyCode === forwardKey.value) {
        walk.stop();
      }
      else if(event.keyCode === leftKey.value) {
        walk.stop();
      }
      else if(event.keyCode === 68) {
        walk.stop();
      }
      else if(event.keyCode === 83) {
        walk.stop();
      }
      else if(event.keyCode === 32){
        walkModel.visible = true;
      }
    })

    camera.position.sub(controls.target)
    controls.target.copy(walkModel.position)
    camera.position.add(walkModel.position)
}

function addMobileJoystick(){
   const options = {
      zone: document.getElementById('joystick-wrapper'),
      size: window.innerWidth > 500 ? 200 : 120,
      multitouch: true,
      maxNumberOfNipples: 2,
      mode: 'static',
      restJoystick: true,
      shape: 'circle',
      position: { top: '60px', left: '60px' },
      dynamicPage: true,
      color: "orange"
    }
   
    joystick = nipplejs.create(options);
  
    joystick['0'].on('move', function (evt, data) {
        const forward = data.vector.y
        const turn = data.vector.x

        if (forward > 0) {
          forwardValue = Math.abs(forward)
          backwardValue = 0
        } 
        else if (forward < 0) {
          forwardValue = 0
          backwardValue = Math.abs(forward)
        }

        if (turn > 0) {
          leftValue = 0
          rightValue = Math.abs(turn)
        } 
        else if (turn < 0) {
          leftValue = Math.abs(turn)
          rightValue = 0
        }
    });

    joystick['0'].on('end', function (evt) {
        backwardValue = 0;
        forwardValue = 0;
        leftValue = 0;
        rightValue = 0;

        walk.stop();
    });
  
}

function changeCharacterDirection() {
    controls.addEventListener('change', function() {
      const direction = new THREE.Vector3(0, 0, -1);
      camera.getWorldDirection(direction);

      const angle = Math.atan2(direction.x, direction.z);

      walkModel.rotation.y = angle;
    });
}

function close() {
  showPopin.value = false;
  showPopinRD.value = false;
  showPopinAboutMe.value = false;
  showPopinEducation.value = false;
  showPopinExperience.value = false;
  showPopinMedSoc.value = false;
  showPopinSkill.value = false;
  showPopinHow.value = false;
}

function openInformation() {
  showPopinHow.value === true ? showPopinHow.value = false : showPopinHow.value = true;
}

function click() {

  if(deviceName.value === 'mobile') {
    const clickBtn = document.querySelector('.click-btn');

    clickBtn.addEventListener('touchstart', function(e) {

      if(detectClickCollision(walkModel, sprite1) == true) {
        // Viami
        showPopin.value = true;
        openPopin.value = 0;
      }
      else if(detectClickCollision(walkModel, sprite2) == true) {
        // Timer
        showPopin.value = true;
        openPopin.value = 2;
      }
      else if(detectClickCollision(walkModel, sprite3) == true) {
        // Reuninou
        showPopin.value = true;
        openPopin.value = 4;
      }
      else if(detectClickCollision(walkModel, sprite4) == true) {
        // Bicycle
        showPopin.value = true;
        openPopin.value = 5;
      }
      else if(detectClickCollision(walkModel, sprite5) == true) {
        // Covid
        showPopin.value = true;
        openPopin.value = 7;
      }
      else if(detectClickCollision(walkModel, sprite6) == true) {
        // Museum maritime
        showPopin.value = true;
        openPopin.value = 8;
      }
      else if(detectClickCollision(walkModel, sprite7) == true) {
        // Lehangar.local
        showPopin.value = true;
        openPopin.value = 12;
      }
      else if(detectClickCollision(walkModel, sprite8) == true) {
        showPopin.value = true;
        openPopin.value = 1;
      }
      else if(detectClickCollision(walkModel, sprite9) == true) {
        showPopin.value = true;
        openPopin.value = 3;
      }
      else if(detectClickCollision(walkModel, sprite10) == true) {
        showPopin.value = true;
        openPopin.value = 6;
      }
      else if(detectClickCollision(walkModel, sprite11) == true) {
        showPopin.value = true;
        openPopin.value = 9;
      }
      else if(detectClickCollision(walkModel, sprite12) == true) {
        showPopin.value = true;
        openPopin.value = 10;
      }
      else if(detectClickCollision(walkModel, sprite13) == true) {
        showPopin.value = true;
        openPopin.value = 11;
      }
      else if(detectClickCollision(walkModel, sprite14) == true) {
        showPopin.value = true;
        openPopin.value = 13;
      }
      else if(detectClickCollision(walkModel, spriteRight1) == true) {
        showPopinRD.value = true;
        openPopin.value = 0;
      }
      else if(detectClickCollision(walkModel, spriteRight2) == true) {
        showPopinRD.value = true;
        openPopin.value = 1;
      }
      else if(detectClickCollision(walkModel, spriteRight3) == true) {
        showPopinRD.value = true;
        openPopin.value = 5;
      }
      else if(detectClickCollision(walkModel, spriteRight4) == true) {
        showPopinRD.value = true;
        openPopin.value = 4;
      }
      else if(detectClickCollision(walkModel, spriteRight5) == true) {
        showPopinRD.value = true;
        openPopin.value = 3;
      }
      else if(detectClickCollision(walkModel, spriteRight6) == true) {
        showPopinRD.value = true;
        openPopin.value = 6;
      }
      else if(detectClickCollision(walkModel, spriteRight7) == true) {
        showPopinRD.value = true;
        openPopin.value = 2;
      }
      else if(detectClickCollision(walkModel, spriteStone1) == true) {
        showPopinExperience.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone2) == true) {
        showPopinSkill.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone3) == true) {
        showPopinAboutMe.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone4) == true) {
        showPopinEducation.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone5) == true) {
        showPopinMedSoc.value = true;
      }
    });
  }
  else {
   // const clickBtn = document.querySelector('.click-btn-desktop');

    //clickBtn.addEventListener('mousedown', function(e) {
      if(detectClickCollision(walkModel, sprite1) == true) {
        // Viami
        showPopin.value = true;
        openPopin.value = 0;
      }
      else if(detectClickCollision(walkModel, sprite2) == true) {
        // Timer
        showPopin.value = true;
        openPopin.value = 2;
      }
      else if(detectClickCollision(walkModel, sprite3) == true) {
        // Reuninou
        showPopin.value = true;
        openPopin.value = 4;
      }
      else if(detectClickCollision(walkModel, sprite4) == true) {
        // Bicycle
        showPopin.value = true;
        openPopin.value = 5;
      }
      else if(detectClickCollision(walkModel, sprite5) == true) {
        // Covid
        showPopin.value = true;
        openPopin.value = 7;
      }
      else if(detectClickCollision(walkModel, sprite6) == true) {
        // Museum maritime
        showPopin.value = true;
        openPopin.value = 8;
      }
      else if(detectClickCollision(walkModel, sprite7) == true) {
        // Lehangar.local
        showPopin.value = true;
        openPopin.value = 12;
      }
      else if(detectClickCollision(walkModel, sprite8) == true) {
        showPopin.value = true;
        openPopin.value = 1;
      }
      else if(detectClickCollision(walkModel, sprite9) == true) {
        showPopin.value = true;
        openPopin.value = 3;
      }
      else if(detectClickCollision(walkModel, sprite10) == true) {
        showPopin.value = true;
        openPopin.value = 6;
      }
      else if(detectClickCollision(walkModel, sprite11) == true) {
        showPopin.value = true;
        openPopin.value = 9;
      }
      else if(detectClickCollision(walkModel, sprite12) == true) {
        showPopin.value = true;
        openPopin.value = 10;
      }
      else if(detectClickCollision(walkModel, sprite13) == true) {
        showPopin.value = true;
        openPopin.value = 11;
      }
      else if(detectClickCollision(walkModel, sprite14) == true) {
        showPopin.value = true;
        openPopin.value = 13;
      }
      else if(detectClickCollision(walkModel, spriteRight1) == true) {
        showPopinRD.value = true;
        openPopin.value = 0;
      }
      else if(detectClickCollision(walkModel, spriteRight2) == true) {
        showPopinRD.value = true;
        openPopin.value = 1;
      }
      else if(detectClickCollision(walkModel, spriteRight3) == true) {
        showPopinRD.value = true;
        openPopin.value = 5;
      }
      else if(detectClickCollision(walkModel, spriteRight4) == true) {
        showPopinRD.value = true;
        openPopin.value = 4;
      }
      else if(detectClickCollision(walkModel, spriteRight5) == true) {
        showPopinRD.value = true;
        openPopin.value = 3;
      }
      else if(detectClickCollision(walkModel, spriteRight6) == true) {
        showPopinRD.value = true;
        openPopin.value = 6;
      }
      else if(detectClickCollision(walkModel, spriteRight7) == true) {
        showPopinRD.value = true;
        openPopin.value = 2;
      }
      else if(detectClickCollision(walkModel, spriteStone1) == true) {
        showPopinExperience.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone2) == true) {
        showPopinSkill.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone3) == true) {
        showPopinAboutMe.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone4) == true) {
        showPopinEducation.value = true;
      }
      else if(detectClickCollision(walkModel, spriteStone5) == true) {
        showPopinMedSoc.value = true;
      }
    //});
  }
}

</script>