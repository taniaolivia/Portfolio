<template>
  <div id="map"></div>

  <div id="info">Description</div>

  <div id="mobileInterface" class="noSelect">
    <div id="joystick-wrapper"></div> 
  </div>
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

let pointingMixer, pointingModel, point;
let mixer, walkModel, walk;
let wave, mapModel, bridge1, bridge2, bridge3, bridge4;
let bridgeHandleR1, bridgeHandleR2, bridgeHandleR3, bridgeHandleR4, bridgeHandleL1, bridgeHandleL2, bridgeHandleL3, bridgeHandleL4;
let arrowLeftModel, pointingArrowLeft, arrowLeftMixer;
let arrowRightModel, pointingArrowRight, arrowRightMixer;
let arrowFrontModel, pointingArrowFront, arrowFrontMixer;

let cdn = import.meta.env.VITE_CDN_URL;
let width = window.innerWidth, height = window.innerHeight;
let camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 1000 );

let gui = new GUI();
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x05081c);

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.gammaOutput = true;

camera.position.set(-25, 30, 40);

/*const leftLight = new THREE.DirectionalLight(0xffffff, 2.5);
leftLight.position.set(-1, 0, 0);
scene.add(leftLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 2.5);
rightLight.position.set(1, 0, 0);
scene.add(rightLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(0, 1, 0); 
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight2.position.set(0, -1, 0); 
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight3.position.set(0, 0, 1); 
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight4.position.set(0, 0, -1); 
scene.add(directionalLight4);*/

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.324)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.754)
moonLight.position.set(2.542, 5, -1.637)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorlight = new THREE.PointLight('#ff7d46', 1, 7)
doorlight.position.set(0, 2.2, 2.7)
scene.add(doorlight)

// ENTRANCE LIGHTS
const lightEntranceLeft1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceLeft1)

const lightEntranceLeft2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceLeft2)

const lightEntranceLeft3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceLeft3)

const lightEntranceLeft4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceLeft4)

const lightEntranceRight1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceRight1)

const lightEntranceRight2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceRight2)

const lightEntranceRight3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceRight3)

const lightEntranceRight4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightEntranceRight4)

// MIDDLE LATTERN
const lightMiddleFront = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightMiddleFront)

const lightMiddleBack = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightMiddleBack)


// RIGHT SIDE LANTERNS
const lightRightFront1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFront1)

const lightRightBack1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBack1)

const lightRightFront2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFront2)

const lightRightBack2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBack2)

const lightRightFront3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFront3)

const lightRightBack3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBack3)

const lightRightFront4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFront4)

const lightRightBack4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBack4)

const lightRightFront5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFront5)

const lightRightBack5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBack5)

const lightRightFrontBottom1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFrontBottom1)

const lightRightBackBottom1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBackBottom1)

const lightRightFrontBottom2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFrontBottom2)

const lightRightBackBottom2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBackBottom2)

const lightRightFrontBottom3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFrontBottom3)

const lightRightBackBottom3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBackBottom3)

const lightRightFrontBottom4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFrontBottom4)

const lightRightBackBottom4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBackBottom4)

const lightRightFrontBottom5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightFrontBottom5)

const lightRightBackBottom5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightRightBackBottom5)


// LEFT SIDE LANTERNS (TOP)
const lightLeftFront1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront1)

const lightLeftBack1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack1)

const lightLeftFront2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront2)

const lightLeftBack2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack2)

const lightLeftFront3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront3)

const lightLeftBack3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack3)

const lightLeftFront4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront4)

const lightLeftBack4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack4)

const lightLeftFront5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront5)

const lightLeftBack5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack5)

const lightLeftFront6 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront6)

const lightLeftBack6 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack6)

const lightLeftFront7 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront7)

const lightLeftBack7 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack7)

const lightLeftFront8 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront8)

const lightLeftBack8 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack8)

const lightLeftFront9 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront9)

const lightLeftBack9 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack9)

const lightLeftFront10 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront10)

const lightLeftBack10 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack10)

const lightLeftFront11 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront11)

const lightLeftBack11 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack11)

const lightLeftFront12 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFront12)

const lightLeftBack12 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBack12)


// LEFT SIDE LANTERNS (BOTTOM)
const lightLeftFrontBottom1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom1)

const lightLeftBackBottom1 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom1)

const lightLeftFrontBottom2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom2)

const lightLeftBackBottom2 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom2)

const lightLeftFrontBottom3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom3)

const lightLeftBackBottom3 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom3)

const lightLeftFrontBottom4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom4)

const lightLeftBackBottom4 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom4)

const lightLeftFrontBottom5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom5)

const lightLeftBackBottom5 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom5)

const lightLeftFrontBottom6 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom6)

const lightLeftBackBottom6 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom6)

const lightLeftFrontBottom7 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom7)

const lightLeftBackBottom7 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom7)

const lightLeftFrontBottom8 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom8)

const lightLeftBackBottom8 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom8)

const lightLeftFrontBottom9 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom9)

const lightLeftBackBottom9 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom9)

const lightLeftFrontBottom10 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom10)

const lightLeftBackBottom10 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom10)

const lightLeftFrontBottom11 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom11)

const lightLeftBackBottom11 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom11)

const lightLeftFrontBottom12 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftFrontBottom12)

const lightLeftBackBottom12 = new THREE.PointLight('#FFD700', 100, 100)
scene.add(lightLeftBackBottom12)


/**
 * SHADOWS
 */
moonLight.castShadow = true
doorlight.castShadow = true

// ENTRANCE LIGHTS
lightEntranceLeft1.castShadow = true
lightEntranceLeft2.castShadow = true
lightEntranceLeft3.castShadow = true
lightEntranceLeft4.castShadow = true
lightEntranceRight1.castShadow = true
lightEntranceRight2.castShadow = true
lightEntranceRight3.castShadow = true
lightEntranceRight4.castShadow = true

lightEntranceLeft1.shadow.mapSize.width = 256
lightEntranceLeft1.shadow.mapSize.height = 256
lightEntranceLeft1.shadow.camera.far = 7

lightEntranceLeft2.shadow.mapSize.width = 256
lightEntranceLeft2.shadow.mapSize.height = 256
lightEntranceLeft2.shadow.camera.far = 7

lightEntranceLeft3.shadow.mapSize.width = 256
lightEntranceLeft3.shadow.mapSize.height = 256
lightEntranceLeft3.shadow.camera.far = 7

lightEntranceLeft4.shadow.mapSize.width = 256
lightEntranceLeft4.shadow.mapSize.height = 256
lightEntranceLeft4.shadow.camera.far = 7

lightEntranceRight1.shadow.mapSize.width = 256
lightEntranceRight1.shadow.mapSize.height = 256
lightEntranceRight1.shadow.camera.far = 7

lightEntranceRight2.shadow.mapSize.width = 256
lightEntranceRight2.shadow.mapSize.height = 256
lightEntranceRight2.shadow.camera.far = 7

lightEntranceRight3.shadow.mapSize.width = 256
lightEntranceRight3.shadow.mapSize.height = 256
lightEntranceRight3.shadow.camera.far = 7

lightEntranceRight4.shadow.mapSize.width = 256
lightEntranceRight4.shadow.mapSize.height = 256
lightEntranceRight4.shadow.camera.far = 7


// MIDDLE LANTERN
lightMiddleFront.castShadow = true
lightMiddleBack.castShadow = true

lightMiddleFront.shadow.mapSize.width = 256
lightMiddleFront.shadow.mapSize.height = 256
lightMiddleFront.shadow.camera.far = 7

lightMiddleBack.shadow.mapSize.width = 256
lightMiddleBack.shadow.mapSize.height = 256
lightMiddleBack.shadow.camera.far = 7

// RIGHT SIDE LANTERNS
lightRightFront1.castShadow = true
lightRightBack1.castShadow = true
lightRightFront2.castShadow = true
lightRightBack2.castShadow = true
lightRightFront3.castShadow = true
lightRightBack3.castShadow = true
lightRightFront4.castShadow = true
lightRightBack4.castShadow = true
lightRightFront5.castShadow = true
lightRightBack5.castShadow = true

// RIGHT SIDE LANTERNS (TOP)
lightRightFront1.shadow.mapSize.width = 256
lightRightFront1.shadow.mapSize.height = 256
lightRightFront1.shadow.camera.far = 7

lightRightBack1.shadow.mapSize.width = 256
lightRightBack1.shadow.mapSize.height = 256
lightRightBack1.shadow.camera.far = 7

lightRightFront2.shadow.mapSize.width = 256
lightRightFront2.shadow.mapSize.height = 256
lightRightFront2.shadow.camera.far = 7

lightRightBack2.shadow.mapSize.width = 256
lightRightBack2.shadow.mapSize.height = 256
lightRightBack2.shadow.camera.far = 7

lightRightFront3.shadow.mapSize.width = 256
lightRightFront3.shadow.mapSize.height = 256
lightRightFront3.shadow.camera.far = 7

lightRightBack3.shadow.mapSize.width = 256
lightRightBack3.shadow.mapSize.height = 256
lightRightBack3.shadow.camera.far = 7

lightRightFront4.shadow.mapSize.width = 256
lightRightFront4.shadow.mapSize.height = 256
lightRightFront4.shadow.camera.far = 7

lightRightBack4.shadow.mapSize.width = 256
lightRightBack4.shadow.mapSize.height = 256
lightRightBack4.shadow.camera.far = 7

lightRightFront5.shadow.mapSize.width = 256
lightRightFront5.shadow.mapSize.height = 256
lightRightFront5.shadow.camera.far = 7

lightRightBack5.shadow.mapSize.width = 256
lightRightBack5.shadow.mapSize.height = 256
lightRightBack5.shadow.camera.far = 7

// RIGHT SIDE LANTERNS (BOTTOM)
lightRightFrontBottom1.shadow.mapSize.width = 256
lightRightFrontBottom1.shadow.mapSize.height = 256
lightRightFrontBottom1.shadow.camera.far = 7

lightRightBackBottom1.shadow.mapSize.width = 256
lightRightBackBottom1.shadow.mapSize.height = 256
lightRightBackBottom1.shadow.camera.far = 7

lightRightFront2.shadow.mapSize.width = 256
lightRightFront2.shadow.mapSize.height = 256
lightRightFront2.shadow.camera.far = 7

lightRightBackBottom2.shadow.mapSize.width = 256
lightRightBackBottom2.shadow.mapSize.height = 256
lightRightBackBottom2.shadow.camera.far = 7

lightRightFrontBottom3.shadow.mapSize.width = 256
lightRightFrontBottom3.shadow.mapSize.height = 256
lightRightFrontBottom3.shadow.camera.far = 7

lightRightBackBottom3.shadow.mapSize.width = 256
lightRightBackBottom3.shadow.mapSize.height = 256
lightRightBackBottom3.shadow.camera.far = 7

lightRightFrontBottom4.shadow.mapSize.width = 256
lightRightFrontBottom4.shadow.mapSize.height = 256
lightRightFrontBottom4.shadow.camera.far = 7

lightRightBackBottom4.shadow.mapSize.width = 256
lightRightBackBottom4.shadow.mapSize.height = 256
lightRightBackBottom4.shadow.camera.far = 7

lightRightFrontBottom5.shadow.mapSize.width = 256
lightRightFrontBottom5.shadow.mapSize.height = 256
lightRightFrontBottom5.shadow.camera.far = 7

lightRightBackBottom5.shadow.mapSize.width = 256
lightRightBackBottom5.shadow.mapSize.height = 256
lightRightBackBottom5.shadow.camera.far = 7

// LEFT SIDE LANTERNS
lightLeftFront1.castShadow = true
lightLeftBack1.castShadow = true
lightLeftFront2.castShadow = true
lightLeftBack2.castShadow = true
lightLeftFront3.castShadow = true
lightLeftBack3.castShadow = true
lightLeftFront4.castShadow = true
lightLeftBack4.castShadow = true
lightLeftFront5.castShadow = true
lightLeftBack5.castShadow = true
lightLeftFront6.castShadow = true
lightLeftBack6.castShadow = true
lightLeftFront7.castShadow = true
lightLeftBack7.castShadow = true
lightLeftFront8.castShadow = true
lightLeftBack8.castShadow = true
lightLeftFront9.castShadow = true
lightLeftBack9.castShadow = true
lightLeftFront10.castShadow = true
lightLeftBack10.castShadow = true
lightLeftFront11.castShadow = true
lightLeftBack11.castShadow = true
lightLeftFront12.castShadow = true
lightLeftBack12.castShadow = true

// LEFT SIDE LANTERNS (TOP)
lightLeftFront1.shadow.mapSize.width = 256
lightLeftFront1.shadow.mapSize.height = 256
lightLeftFront1.shadow.camera.far = 7

lightLeftBack1.shadow.mapSize.width = 256
lightLeftBack1.shadow.mapSize.height = 256
lightLeftBack1.shadow.camera.far = 7

lightLeftFront2.shadow.mapSize.width = 256
lightLeftFront2.shadow.mapSize.height = 256
lightLeftFront2.shadow.camera.far = 7

lightLeftBack2.shadow.mapSize.width = 256
lightLeftBack2.shadow.mapSize.height = 256
lightLeftBack2.shadow.camera.far = 7

lightLeftFront3.shadow.mapSize.width = 256
lightLeftFront3.shadow.mapSize.height = 256
lightLeftFront3.shadow.camera.far = 7

lightLeftBack3.shadow.mapSize.width = 256
lightLeftBack3.shadow.mapSize.height = 256
lightLeftBack3.shadow.camera.far = 7

lightLeftFront4.shadow.mapSize.width = 256
lightLeftFront4.shadow.mapSize.height = 256
lightLeftFront4.shadow.camera.far = 7

lightLeftBack4.shadow.mapSize.width = 256
lightLeftBack4.shadow.mapSize.height = 256
lightLeftBack4.shadow.camera.far = 7

lightLeftFront5.shadow.mapSize.width = 256
lightLeftFront5.shadow.mapSize.height = 256
lightLeftFront5.shadow.camera.far = 7

lightLeftBack5.shadow.mapSize.width = 256
lightLeftBack5.shadow.mapSize.height = 256
lightLeftBack5.shadow.camera.far = 7

lightLeftFront6.shadow.mapSize.width = 256
lightLeftFront6.shadow.mapSize.height = 256
lightLeftFront6.shadow.camera.far = 7

lightLeftBack6.shadow.mapSize.width = 256
lightLeftBack6.shadow.mapSize.height = 256
lightLeftBack6.shadow.camera.far = 7

lightLeftFront7.shadow.mapSize.width = 256
lightLeftFront7.shadow.mapSize.height = 256
lightLeftFront7.shadow.camera.far = 7

lightLeftBack7.shadow.mapSize.width = 256
lightLeftBack7.shadow.mapSize.height = 256
lightLeftBack7.shadow.camera.far = 7

lightLeftFront8.shadow.mapSize.width = 256
lightLeftFront8.shadow.mapSize.height = 256
lightLeftFront8.shadow.camera.far = 7

lightLeftBack8.shadow.mapSize.width = 256
lightLeftBack8.shadow.mapSize.height = 256
lightLeftBack8.shadow.camera.far = 7

lightLeftFront9.shadow.mapSize.width = 256
lightLeftFront9.shadow.mapSize.height = 256
lightLeftFront9.shadow.camera.far = 7

lightLeftBack9.shadow.mapSize.width = 256
lightLeftBack9.shadow.mapSize.height = 256
lightLeftBack9.shadow.camera.far = 7

lightLeftFront10.shadow.mapSize.width = 256
lightLeftFront10.shadow.mapSize.height = 256
lightLeftFront10.shadow.camera.far = 7

lightLeftBack10.shadow.mapSize.width = 256
lightLeftBack10.shadow.mapSize.height = 256
lightLeftBack10.shadow.camera.far = 7

lightLeftFront11.shadow.mapSize.width = 256
lightLeftFront11.shadow.mapSize.height = 256
lightLeftFront11.shadow.camera.far = 7

lightLeftBack11.shadow.mapSize.width = 256
lightLeftBack11.shadow.mapSize.height = 256
lightLeftBack11.shadow.camera.far = 7

lightLeftFront12.shadow.mapSize.width = 256
lightLeftFront12.shadow.mapSize.height = 256
lightLeftFront12.shadow.camera.far = 7

lightLeftBack12.shadow.mapSize.width = 256
lightLeftBack12.shadow.mapSize.height = 256
lightLeftBack12.shadow.camera.far = 7

// LEFT SIDE LANTERNS (BOTTOM)
lightLeftFrontBottom1.shadow.mapSize.width = 256
lightLeftFrontBottom1.shadow.mapSize.height = 256
lightLeftFrontBottom1.shadow.camera.far = 7

lightLeftBackBottom1.shadow.mapSize.width = 256
lightLeftBackBottom1.shadow.mapSize.height = 256
lightLeftBackBottom1.shadow.camera.far = 7

lightLeftFrontBottom2.shadow.mapSize.width = 256
lightLeftFrontBottom2.shadow.mapSize.height = 256
lightLeftFrontBottom2.shadow.camera.far = 7

lightLeftBackBottom2.shadow.mapSize.width = 256
lightLeftBackBottom2.shadow.mapSize.height = 256
lightLeftBackBottom2.shadow.camera.far = 7

lightLeftFrontBottom3.shadow.mapSize.width = 256
lightLeftFrontBottom3.shadow.mapSize.height = 256
lightLeftFrontBottom3.shadow.camera.far = 7

lightLeftBackBottom3.shadow.mapSize.width = 256
lightLeftBackBottom3.shadow.mapSize.height = 256
lightLeftBackBottom3.shadow.camera.far = 7

lightLeftFrontBottom4.shadow.mapSize.width = 256
lightLeftFrontBottom4.shadow.mapSize.height = 256
lightLeftFrontBottom4.shadow.camera.far = 7

lightLeftBackBottom4.shadow.mapSize.width = 256
lightLeftBackBottom4.shadow.mapSize.height = 256
lightLeftBackBottom4.shadow.camera.far = 7

lightLeftFrontBottom5.shadow.mapSize.width = 256
lightLeftFrontBottom5.shadow.mapSize.height = 256
lightLeftFrontBottom5.shadow.camera.far = 7

lightLeftBackBottom5.shadow.mapSize.width = 256
lightLeftBackBottom5.shadow.mapSize.height = 256
lightLeftBackBottom5.shadow.camera.far = 7

lightLeftFrontBottom6.shadow.mapSize.width = 256
lightLeftFrontBottom6.shadow.mapSize.height = 256
lightLeftFrontBottom6.shadow.camera.far = 7

lightLeftBackBottom6.shadow.mapSize.width = 256
lightLeftBackBottom6.shadow.mapSize.height = 256
lightLeftBackBottom6.shadow.camera.far = 7

lightLeftFrontBottom7.shadow.mapSize.width = 256
lightLeftFrontBottom7.shadow.mapSize.height = 256
lightLeftFrontBottom7.shadow.camera.far = 7

lightLeftBackBottom7.shadow.mapSize.width = 256
lightLeftBackBottom7.shadow.mapSize.height = 256
lightLeftBackBottom7.shadow.camera.far = 7

lightLeftFrontBottom8.shadow.mapSize.width = 256
lightLeftFrontBottom8.shadow.mapSize.height = 256
lightLeftFrontBottom8.shadow.camera.far = 7

lightLeftBackBottom8.shadow.mapSize.width = 256
lightLeftBackBottom8.shadow.mapSize.height = 256
lightLeftBackBottom8.shadow.camera.far = 7

lightLeftFrontBottom9.shadow.mapSize.width = 256
lightLeftFrontBottom9.shadow.mapSize.height = 256
lightLeftFrontBottom9.shadow.camera.far = 7

lightLeftBackBottom9.shadow.mapSize.width = 256
lightLeftBackBottom9.shadow.mapSize.height = 256
lightLeftBackBottom9.shadow.camera.far = 7

lightLeftFrontBottom10.shadow.mapSize.width = 256
lightLeftFrontBottom10.shadow.mapSize.height = 256
lightLeftFrontBottom10.shadow.camera.far = 7

lightLeftBackBottom10.shadow.mapSize.width = 256
lightLeftBackBottom10.shadow.mapSize.height = 256
lightLeftBackBottom10.shadow.camera.far = 7

lightLeftFrontBottom11.shadow.mapSize.width = 256
lightLeftFrontBottom11.shadow.mapSize.height = 256
lightLeftFrontBottom11.shadow.camera.far = 7

lightLeftBackBottom11.shadow.mapSize.width = 256
lightLeftBackBottom11.shadow.mapSize.height = 256
lightLeftBackBottom11.shadow.camera.far = 7

lightLeftFrontBottom12.shadow.mapSize.width = 256
lightLeftFrontBottom12.shadow.mapSize.height = 256
lightLeftFrontBottom12.shadow.camera.far = 7

lightLeftBackBottom12.shadow.mapSize.width = 256
lightLeftBackBottom12.shadow.mapSize.height = 256
lightLeftBackBottom12.shadow.camera.far = 7


//const clock = new THREE.Clock()
//const elapsedTime = clock.getElapsedTime()

// Update ghost

gui.add(lightEntranceLeft4, 'intensity').min(0).max(100).step(0.001)
gui.add(lightEntranceLeft4.position, 'x').min(-100).max(100).step(0.001)
gui.add(lightEntranceLeft4.position, 'y').min(-100).max(100).step(0.001)
gui.add(lightEntranceLeft4.position, 'z').min(-100).max(100).step(0.001)

gui.add(lightEntranceRight4, 'intensity').min(0).max(100).step(0.001)
gui.add(lightEntranceRight4.position, 'x').min(-100).max(100).step(0.001)
gui.add(lightEntranceRight4.position, 'y').min(-100).max(100).step(0.001)
gui.add(lightEntranceRight4.position, 'z').min(-100).max(100).step(0.001)


// ENTRANCE LIGHTS
lightEntranceLeft1.position.set(-54.868, 18.878, 77.876)
lightEntranceLeft2.position.set(-49.952, 18.878, 65.585)
lightEntranceLeft3.position.set(-45.036, 20, 53.294)
lightEntranceLeft4.position.set(-45.036, 20, 53.294)
lightEntranceRight1.position.set(-47.494, 18.878, 82.792)
lightEntranceRight2.position.set(-42.577, 18.878, 70.501)
lightEntranceRight3.position.set(-35.203, 20, 60.668)
lightEntranceRight4.position.set(-35.203, 20, 60.668)

//const ghost1Angle = elapsedTime * 0.5
// MIDDLE LANTERN
lightMiddleFront.position.set(-22.923, 17.234, 31.163)
lightMiddleBack.position.set(-18.006, 16.412, 23.788)

// RIGHT SIDE LATERNS TOP
lightRightFront1.position.set(-13.089, 18.871, 36.08)
lightRightBack1.position.set(-8.172, 18.871, 31.163)

lightRightFront2.position.set(-8.172, 18.871, 40.997)
lightRightBack2.position.set(-3.256, 18.871, 33.621)

lightRightFront3.position.set(-3.256, 18.871, 43.455)
lightRightBack3.position.set(3.2, 18.871, 38.538)

lightRightFront4.position.set(4.12, 18.871, 48.372)
lightRightBack4.position.set(11.495, 18.871, 40.997)

lightRightFront5.position.set(11.495, 18.871, 52.289)
lightRightBack5.position.set(17.6, 18.871, 45.914)


// RIGHT SIDE LATERNS BOTTOM
lightRightFrontBottom1.position.set(-13.089, 11.495, 36.08)
lightRightBackBottom1.position.set(-8.172, 11.495, 31.163)

lightRightFrontBottom2.position.set(-8.172, 11.495, 40.997)
lightRightBackBottom2.position.set(-3.256, 11.495, 33.621)

lightRightFrontBottom3.position.set(-3.256, 11.495, 43.455)
lightRightBackBottom3.position.set(3.2, 11.495, 38.538)

lightRightFrontBottom4.position.set(4.12, 11.495, 48.372)
lightRightBackBottom4.position.set(11.495, 11.495, 40.997)

lightRightFrontBottom5.position.set(11.495, 11.495, 52.289)
lightRightBackBottom5.position.set(17.6, 11.495, 45.914)


// LEFT SIDE LATERNS TOP
lightLeftFront1.position.set(-30.286, 18.871, 30.286)
lightLeftBack1.position.set(-25.37, 18.871, 21.337)

lightLeftFront2.position.set(-35.203, 18.871, 23.795)
lightLeftBack2.position.set(-32.744, 18.871, 16.42)

lightLeftFront3.position.set(-41, 18.871, 18.878)
lightLeftBack3.position.set(-35.203, 18.871, 9.046)

lightLeftFront4.position.set(-45.036, 18.871, 16.42)
lightLeftBack4.position.set(-45.036, 18.871, 6.587)

lightLeftFront5.position.set(-52.41, 18.871, 11.504)
lightLeftBack5.position.set(-47.494, 18.871, 4.129)

lightLeftFront6.position.set(-57.327, 18.871, 9.046)
lightLeftBack6.position.set(-49.952, 18.871, 1.671)

lightLeftFront7.position.set(-62.243, 18.871, 4.8)
lightLeftBack7.position.set(-57.327, 18.871, -3.246)

lightLeftFront8.position.set(-64.701, 18.871, 4.129)
lightLeftBack8.position.set(-62.243, 18.871, -5.704)

lightLeftFront9.position.set(-69.618, 18.871, 0.8)
lightLeftBack9.position.set(-67.16, 18.871, -8.162)

lightLeftFront10.position.set(-76.993, 18.871, -3.246)
lightLeftBack10.position.set(-69.618, 18.871, -10.62)

lightLeftFront11.position.set(-81.909, 18.871, -5.704)
lightLeftBack11.position.set(-76.993, 18.871, -13.079)

lightLeftFront12.position.set(-84.367, 18.871,-8.162)
lightLeftBack12.position.set(-17.995, 18.871, -17.995)


// LEFT SIDE LATERNS BOTTOM
lightLeftFrontBottom1.position.set(-30.286, 11.495, 30.286)
lightLeftBackBottom1.position.set(-25.37, 11.495, 21.337)

lightLeftFrontBottom2.position.set(-35.203, 11.495, 23.795)
lightLeftBackBottom2.position.set(-32.744, 11.495, 16.42)

lightLeftFrontBottom3.position.set(-41, 11.495, 18.878)
lightLeftBackBottom3.position.set(-35.203, 11.495, 9.046)

lightLeftFrontBottom4.position.set(-45.036, 11.495, 16.42)
lightLeftBackBottom4.position.set(-45.036, 11.495, 6.587)

lightLeftFrontBottom5.position.set(-52.41, 11.495, 11.504)
lightLeftBackBottom5.position.set(-47.494, 11.495, 4.129)

lightLeftFrontBottom6.position.set(-57.327, 11.495, 9.046)                                       
lightLeftBackBottom6.position.set(-49.952, 11.495, 1.671)

lightLeftFrontBottom7.position.set(-62.243, 11.495, 4.8)
lightLeftBackBottom7.position.set(-57.327, 11.495, -3.246)

lightLeftFrontBottom8.position.set(-64.701, 11.495, 4.129)
lightLeftBackBottom8.position.set(-62.243, 11.495, -5.704)

lightLeftFrontBottom9.position.set(-69.618, 11.495, 0.8)
lightLeftBackBottom9.position.set(-67.16, 11.495, -8.162)

lightLeftFrontBottom10.position.set(-76.993, 11.495, -3.246)
lightLeftBackBottom10.position.set(-69.618, 11.495, -10.62)

lightLeftFrontBottom11.position.set(-81.909, 11.495, -5.704)
lightLeftBackBottom11.position.set(-76.993, 11.495, -13.079)

lightLeftFrontBottom12.position.set(-84.367, 11.495,-8.162)
lightLeftBackBottom12.position.set(-17.995, 11.495, -17.995)


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

controls.maxDistance = 10;
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

let loader = new GLTFLoader();

let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( cdn + 'examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );



onMounted(() => {

    document.getElementById("map").appendChild(renderer.domElement);
    window.addEventListener('resize', resize);

    createModels();
    addMobileJoystick();
    changeCharacterDirection();
    resize();

    animate();

})

function animate() {
    requestAnimationFrame(animate);
    
    if(walkModel !== undefined) {
      //updatePlayer();
      updatePlayerDesktop() 
    }

    if(mixer !== undefined && pointingMixer !== undefined) {
      mixer.update(0.06);
      pointingMixer.update(0.04);
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

    textRight2Mesh = new THREE.Mesh(standRight2Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

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

    textLeft5Mesh = new THREE.Mesh(standLeft5Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textLeft5Mesh.castShadow = true;
    textLeft5Mesh.position.set(-50.4, 12.8, -7.6);
    textLeft5Mesh.rotation.set(0, 2.6, 0);

    scene.add(textLeft5Mesh)

    standRight5Geometry = new TextGeometry( "Media Library App", {
      font: font,
      size: 0.65,
      height: 0.6
    })

    textRight5Mesh = new THREE.Mesh(standRight5Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

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

    textLeft7Mesh = new THREE.Mesh(standLeft7Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

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

    textLeft1Mesh = new THREE.Mesh(standLeft1Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

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

    textRight3Mesh = new THREE.Mesh(standRight3Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

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

    /*standRight4Geometry = new TextGeometry( "Beehoneyst", {
      font: font,
      size: 0.9,
      height: 0.7
    })

    textRight4Mesh = new THREE.Mesh(standRight4Geometry, new THREE.MeshPhongMaterial({color: 0x000000}), new THREE.MeshPhongMaterial({color: 0x000000}));

    textRight4Mesh.castShadow = true;
    textRight4Mesh.position.set(-37, 12.6, -25.7);
    textRight4Mesh.rotation.set(0, -0.6, 0);

    scene.add(textRight4Mesh)*/
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

    textLeftMesh = new THREE.Mesh(standLeftGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

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

    textRightMesh = new THREE.Mesh(standRightGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

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

    textProfessionalMesh = new THREE.Mesh(professionalGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

    textProfessionalMesh.castShadow = true;
    textProfessionalMesh.position.set(39, 14, -31.2);
    textProfessionalMesh.rotation.set(0, -0.6, 0);

    scene.add(textProfessionalMesh)

    experienceGeometry = new TextGeometry( "EXPERIENCES", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textExperienceMesh = new THREE.Mesh(experienceGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

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

    textAboutMesh = new THREE.Mesh(aboutGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

    textAboutMesh.castShadow = true;
    textAboutMesh.position.set(29, 14, -88.2);
    textAboutMesh.rotation.set(0, -0.6, 0);

    scene.add(textAboutMesh)

    // COMPETENCES & SKILLS
    skillGeometry = new TextGeometry( "COMPETENCES & SKILLS", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textSkillMesh = new THREE.Mesh(skillGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

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

    textEducationMesh = new THREE.Mesh(educationGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0xFFD700}));

    textEducationMesh.castShadow = true;
    textEducationMesh.position.set(-20.3, 13, -69.2);
    textEducationMesh.rotation.set(0, -0.6, 0);

    scene.add(textEducationMesh)

    // SOCIAL MEDIAS
    socmedGeometry = new TextGeometry( "SOCIAL MEDIAS", {
      font: font,
      size: 0.6,
      height: 0.55
    })

    textSocmedMesh = new THREE.Mesh(socmedGeometry, new THREE.MeshPhongMaterial({color: 0xFFD700}), new THREE.MeshPhongMaterial({color: 0x000000}));

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
        bridge1 = mapModel.children[53];
        bridge2 = mapModel.children[54];
        bridge3 = mapModel.children[55];
        bridge4 = mapModel.children[56];

        bridgeHandleR2 = mapModel.children[65];
        bridgeHandleR3 = mapModel.children[66];
        bridgeHandleL2 = mapModel.children[67];
        bridgeHandleL3 = mapModel.children[68];
        bridgeHandleR4 = mapModel.children[69];
        bridgeHandleL4 = mapModel.children[70];
        bridgeHandleL1 = mapModel.children[71];
        bridgeHandleR1 = mapModel.children[72];

        console.log(mapModel)

        /*const light = new THREE.PointLight( 0xffffff, 1, 100 );
        light.position.set( 50, 50, 50 );
        scene.add( light );*/

        loader.load(cdn + 'models/tania_pointing.glb', function ( gltf ) {
      
          pointingModel = gltf.scene;
          pointingModel.scale.set(0.8, 0.8, 0.8); 
          pointingModel.position.set(-56.5, 6.5, 85); 
          pointingModel.rotation.set(0, -3.5, 0);

          scene.add(pointingModel)
          
          pointingMixer = new THREE.AnimationMixer(pointingModel);
          point = pointingMixer.clipAction(gltf.animations[0]);

          pointingModel.visible = false;
        });

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
    });
}

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function detectCollision(modelMesh, otherMesh, distanceThreshold) {
    const modelBox = new THREE.Box3().setFromObject(modelMesh);
    const otherBox = new THREE.Box3().setFromObject(otherMesh);

    if (modelBox.intersectsBox(otherBox)) {
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

    if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false){
      walkModel.position.y = 6;
    }
    
    if (forwardValue > 0) {
        tempVector.set(0, 0, -forwardValue).applyAxisAngle(upVector, angle)
        walkModel.position.addScaledVector(tempVector, 0.5) 
        walk.play()
    }
  
    if (backwardValue > 0) {
      tempVector.set(0, 0, backwardValue).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }

    if (leftValue > 0) {
      tempVector.set(-leftValue, 0, 0).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }

    if (rightValue > 0) {
      tempVector.set(rightValue, 0, 0).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }
  
    camera.position.sub(controls.target)
    controls.target.copy(walkModel.position)
    camera.position.add(walkModel.position)

};

let collision;
  
function updatePlayerDesktop() {
 
  document.onkeydown = ((event) => {
      if(event.keyCode === 90) {
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
        

        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false){
          walkModel.position.y = 6;
        }

        walk.play();

        /*if (detectCollision(walkModel, bridgeHandleR1) === true
          && walkModel.position.x >= (bridgeHandleR1.position.x + bridgeHandleR1.geometry.boundingBox.max.x) / 4
        ) {
          console.log("collide 1")
        }
        else if (detectCollision(walkModel, bridgeHandleR2) === true
          && walkModel.position.x >= (bridgeHandleR2.position.x + bridgeHandleR2.geometry.boundingBox.max.x) / 4
        ) {
          console.log("collide 2")

        }
        else if (detectCollision(walkModel, bridgeHandleR3) === true
          && walkModel.position.x >= (bridgeHandleR3.position.x + bridgeHandleR3.geometry.boundingBox.max.x) / 4
        ) {
          console.log("collide 3")

        }
        else if (detectCollision(walkModel, bridgeHandleR4) === true
          && walkModel.position.x >= (bridgeHandleR4.position.x + bridgeHandleR4.geometry.boundingBox.max.x) / 4
        ) {
          console.log("collide 4")

        }
        else {
         console.log("no collision")
          walkModel.translateZ(0.6);
          walkModel.translateX(-0.1);         
        }*/

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
          walkModel.translateZ(0.6);
          walkModel.translateX(-0.1);   
        }
        
      }
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
        

        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false){
          walkModel.position.y = 6;
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
          walkModel.translateX(-0.5);
        }

      }
      else if(event.keyCode === 81) {
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
        
        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false){
          walkModel.position.y = 6;
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
          walkModel.translateX(0.5);
        }
      }
      else if(event.keyCode === 83) {
          walk.play();

          walkModel.translateZ(-0.6);

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
          walkModel.translateX(0.1);
        }
         
        if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false ){
          walkModel.position.y = 6;
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
      else {        
        point.play();

        walkModel.visible = false;
        pointingModel.visible = true;

        pointingModel.position.copy(walkModel.position)
      }
    })

    document.onkeyup = ((event) => {
      if(event.keyCode === 90) {
        walk.stop();
      }
      else if(event.keyCode === 81) {
        walk.stop();
      }
      else if(event.keyCode === 68) {
        walk.stop();
      }
      else if(event.keyCode === 83) {
        walk.stop();
      }
      else {
        point.stop();

        walkModel.visible = true;
        pointingModel.visible = false;

        pointingModel.position.copy(walkModel.position)
      }
    })

    camera.position.sub(controls.target)
    controls.target.copy(walkModel.position)
    camera.position.add(walkModel.position)
}

function addMobileJoystick(){
   const options = {
      zone: document.getElementById('joystick-wrapper'),
      size: 120,
      multitouch: true,
      maxNumberOfNipples: 2,
      mode: 'static',
      restJoystick: true,
      shape: 'circle',
      position: { top: '60px', left: '60px' },
      dynamicPage: true,
      color: "black"
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

</script>