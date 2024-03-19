<template>
  <div id="map">
  
  </div>

  <div id="mobileInterface" class="noSelect">
        <div id="joystickWrapper1"></div>
        
      </div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import nipplejs from 'nipplejs';

let pointingMixer, pointingModel, point;
let mixer, walkModel, walk;
let wave, mapModel, bridge1, bridge2, bridge3, bridge4;
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

let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;

controls.maxDistance = 12;
controls.minDistance = 12;
controls.maxPolarAngle = Math.PI/3;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;
controls.rotateSpeed = 0.4;
controls.enableDamping = false;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;
controls.minAzimuthAngle = -Math.PI; 
controls.maxAzimuthAngle = Math.PI;

controls.update();

let loader = new GLTFLoader();

let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( cdn + 'examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

onMounted(() => {

    document.getElementById("map").appendChild(renderer.domElement);

    createModels();

    resize();

    animate();

    window.addEventListener('resize',resize);

    addJoystick();

    changeCharacterDirection();
})

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
          walkModel.position.set(-56.5, 5.1, 85); 
          walkModel.rotation.set(0, -3.5, 0);

          scene.add(walkModel);

          mixer = new THREE.AnimationMixer(walkModel);

          walk = mixer.clipAction(gltf.animations[0]);
        })

        loader.load(cdn + 'models/arrowLeft.glb', function ( gltf ) {

          arrowLeftModel = gltf.scene;
          arrowLeftModel.scale.set(1, 1, 1); 
          arrowLeftModel.position.set(-12, 5, -50);
          arrowLeftModel.rotation.set(0, 1, 0);

          scene.add(arrowLeftModel);

          arrowLeftMixer = new THREE.AnimationMixer(arrowLeftModel);
          pointingArrowLeft = arrowLeftMixer.clipAction(gltf.animations[0]);

          pointingArrowLeft.play();

          }); 

        loader.load(cdn + 'models/arrowRight.glb', function ( gltf ) {

          arrowRightModel = gltf.scene;
          arrowRightModel.scale.set(1, 1, 1); 
          arrowRightModel.position.set(15, 5, -70);
          arrowRightModel.rotation.set(0, -2.1, 0);

          scene.add(arrowRightModel);

          arrowRightMixer = new THREE.AnimationMixer(arrowRightModel);
          pointingArrowRight = arrowRightMixer.clipAction(gltf.animations[0]);

          pointingArrowRight.play();

          }); 

        loader.load(cdn + 'models/arrowFront.glb', function ( gltf ) {

          arrowFrontModel = gltf.scene;
          arrowFrontModel.scale.set(2, 2, 2); 
          arrowFrontModel.position.set(-25.5, 0, 40); 
          arrowFrontModel.rotation.set(0, -2.1, 0);

          scene.add(arrowFrontModel);

          arrowFrontMixer = new THREE.AnimationMixer(arrowFrontModel);
          pointingArrowFront = arrowFrontMixer.clipAction(gltf.animations[0]);

          pointingArrowFront.play();
        }); 
    });
}

function resize(){
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  renderer.setSize(w,h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}


function animate( ) {
    requestAnimationFrame(animate);
    
    if(walkModel !== undefined) {
      updatePlayer();
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

function detectCollision(modelMesh, otherMesh) {
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
    
    if (fwdValue > 0) {
        tempVector.set(0, 0, -fwdValue).applyAxisAngle(upVector, angle)
        walkModel.position.addScaledVector(tempVector, 0.5) 
        walk.play()
    }
  
    if (bkdValue > 0) {
      tempVector.set(0, 0, bkdValue).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }

    if (lftValue > 0) {
      tempVector.set(-lftValue, 0, 0).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }

    if (rgtValue > 0) {
      tempVector.set(rgtValue, 0, 0).applyAxisAngle(upVector, angle)
      walkModel.position.addScaledVector(tempVector, 0.5)
      walk.play()
    }
  
    // reposition camera
    camera.position.sub(controls.target)
    controls.target.copy(walkModel.position)
    camera.position.add(walkModel.position)

};

function updatePlayerDesktop() {

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

  document.onkeydown = ((event) => {
      if(event.keyCode === 90) {

        walk.play();

        walkModel.translateZ(0.6);
        walkModel.translateX(-0.1);

      }
      else if(event.keyCode === 68) {

        walk.play();
        walkModel.translateX(-0.1);

      }
      else if(event.keyCode === 81) {

        walk.play();
        walkModel.translateX(0.1);

      }
      else if(event.keyCode === 83) {
        
        walk.play();
        walkModel.translateZ(-0.6);
        walkModel.translateX(0.1);

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

function addJoystick(){
   const options = {
        zone: document.getElementById('joystickWrapper1'),
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
   
   
    joyManager = nipplejs.create(options);
  
    joyManager['0'].on('move', function (evt, data) {
        const forward = data.vector.y
        const turn = data.vector.x

        if (forward > 0) {
          fwdValue = Math.abs(forward)
          bkdValue = 0
        } else if (forward < 0) {
          fwdValue = 0
          bkdValue = Math.abs(forward)
        }

        if (turn > 0) {
          lftValue = 0
          rgtValue = Math.abs(turn)
        } else if (turn < 0) {
          lftValue = Math.abs(turn)
          rgtValue = 0
        }
      })

     joyManager['0'].on('end', function (evt) {
        bkdValue = 0
        fwdValue = 0
        lftValue = 0
        rgtValue = 0
        walk.stop()
      })
  
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