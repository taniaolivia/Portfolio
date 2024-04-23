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

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x05081c);

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.gammaOutput = true;

camera.position.set(-25, 30, 40);

const leftLight = new THREE.DirectionalLight(0xffffff, 2.5);
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
scene.add(directionalLight4);

let controls = new OrbitControls( camera, renderer.domElement );

let forwardValue = 0;
let backwardValue = 0;
let rightValue = 0;
let leftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joystick;

controls.maxDistance = 12;
controls.minDistance = 12;
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
    /*standLeft2Geometry = new TextGeometry( "Timer", {
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

    scene.add(textRight4Mesh)*/
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
          arrowLeftModel.scale.set(1, 1, 1); 
          arrowLeftModel.position.set(-17, 7, 1);
          arrowLeftModel.rotation.set(0, 1, 0);

          scene.add(arrowLeftModel);

          arrowLeftMixer = new THREE.AnimationMixer(arrowLeftModel);
          pointingArrowLeft = arrowLeftMixer.clipAction(gltf.animations[0]);

          pointingArrowLeft.play();

          }); 

        loader.load(cdn + 'models/arrowRight.glb', function ( gltf ) {

          arrowRightModel = gltf.scene;
          arrowRightModel.scale.set(1, 1, 1); 
          arrowRightModel.position.set(0, 7, 12);
          arrowRightModel.rotation.set(0, -2.1, 0);

          scene.add(arrowRightModel);

          arrowRightMixer = new THREE.AnimationMixer(arrowRightModel);
          pointingArrowRight = arrowRightMixer.clipAction(gltf.animations[0]);

          pointingArrowRight.play();

          }); 

        loader.load(cdn + 'models/arrowFront.glb', function ( gltf ) {

          arrowFrontModel = gltf.scene;
          arrowFrontModel.scale.set(1, 1, 1); 
          arrowFrontModel.position.set(0.5, 7, -5); 
          arrowFrontModel.rotation.set(0, -2.1, 0);

          scene.add(arrowFrontModel);

          arrowFrontMixer = new THREE.AnimationMixer(arrowFrontModel);
          pointingArrowFront = arrowFrontMixer.clipAction(gltf.animations[0]);

          pointingArrowFront.play();
        }); 

        createTextStandsLeftSide();
        createTextStandsRightSide();
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