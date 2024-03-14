<template>
  <div id="map"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { onMounted } from 'vue';

let mixer, pointingMixer, pointingModel, wave, walkModel, walk, point, mapModel, bridge1, bridge2, bridge3, bridge4;

let cdn = import.meta.env.VITE_CDN_URL;
let width = window.innerWidth, height = window.innerHeight;
let camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 1000 );

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x05081c);

let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.gammaOutput = true;

camera.position.set(-80, 10, 125);
camera.rotation.y = -0.6;

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

onMounted(() => {

    document.getElementById("map").appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( cdn + 'examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load(cdn + 'models/tania_pointing.glb', function ( gltf ) {
    
      pointingModel = gltf.scene;
      pointingModel.scale.set(2, 2, 2); 
      pointingModel.position.set(-70, 2, 110); 
      pointingModel.rotation.set(0, -3.5, 0);

      scene.add(pointingModel)
      
      pointingMixer = new THREE.AnimationMixer(pointingModel);
      point = pointingMixer.clipAction(gltf.animations[0]);

      pointingModel.visible = false;
    });

    loader.load(cdn + 'models/tania_walking.glb', function (gltf) {

      walkModel = gltf.scene;
      walkModel.scale.set(2, 2, 2); 
      walkModel.position.set(-70, 2, 110); 
      walkModel.rotation.set(0, -3.5, 0);

      scene.add(walkModel);

      mixer = new THREE.AnimationMixer(walkModel);

      walk = mixer.clipAction(gltf.animations[0]);
    })

  
    loader.load(cdn + 'models/map.glb', function ( gltf ) {

        mapModel = gltf.scene;
        mapModel.scale.set(0.5, 0.5, 0.5); 
        mapModel.position.set(0, 0, 0); 
        mapModel.rotation.set(0, 1, 0);
        
        scene.add(mapModel);

        wave = mapModel.children[0];
        bridge1 = mapModel.children[63];
        bridge2 = mapModel.children[64];
        bridge3 = mapModel.children[66];
        bridge4 = mapModel.children[67];

        /*const light = new THREE.PointLight( 0xffffff, 1, 100 );
        light.position.set( 50, 50, 50 );
        scene.add( light );*/
      },
      
    );

    document.onkeydown = ((event) => {
      if(event.keyCode === 38) {
        walk.play();

        walkModel.translateZ(0.6);
        walkModel.translateX(-0.1);

        if (detectCollision(walkModel, bridge1) === true && walkModel.position.y <= (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 4) {
            walkModel.position.y = walkModel.position.y + (bridge1.position.y + bridge1.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge2) === true && walkModel.position.y <= (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y + (bridge2.position.y + bridge2.geometry.boundingBox.max.y) / 50; 
        }
        else if (detectCollision(walkModel, bridge3) === true && walkModel.position.y <= (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 2.2) {
          walkModel.position.y = walkModel.position.y + (bridge3.position.y + bridge3.geometry.boundingBox.max.y) / 50; 
        }
        else if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === true){
            walkModel.position.y = walkModel.position.y - (bridge4.position.y + bridge4.geometry.boundingBox.max.y) / 40;
        }
        else if(detectCollision(walkModel, bridge1) === false && detectCollision(walkModel, bridge2) === false && detectCollision(walkModel, bridge3) === false && detectCollision(walkModel, bridge4) === false) {
            walkModel.position.y = 2;
        }
        
        camera.position.copy(walkModel.position)
        camera.position.add(new THREE.Vector3(-17, 20, 30));
        camera.lookAt(walkModel.position)
      }
      /*else if(event.keyCode === 39) {
        walk.play();
        walkModel.position.z -= 0.03;
        walkModel.position.x += 0.03;

        camera.position.copy(walkModel.position)
        camera.position.add(new THREE.Vector3(-15, 8, 20)); // Adjust distance from the model
        camera.lookAt(walkModel.position)
      }
      else if(event.keyCode === 37) {
        walk.play();
        walkModel.position.z -= 0.03;
        walkModel.position.x -= 0.03;

        camera.position.copy(walkModel.position)
        camera.position.add(new THREE.Vector3(-15, 8, 20)); // Adjust distance from the model
        camera.lookAt(walkModel.position)
      }*/
      else {        
        point.play();

        walkModel.visible = false;
        pointingModel.visible = true;

        pointingModel.position.copy(walkModel.position)
      }
    })

    document.onkeyup = ((event) => {
      if(event.keyCode === 38) {
        walk.stop();
      }
      else {
        point.stop();

        walkModel.visible = true;
        pointingModel.visible = false;

        pointingModel.position.copy(walkModel.position)
      }
    })

    animate();
})

function animate( ) {
    requestAnimationFrame(animate);
    
    if(mixer !== undefined) {
      mixer.update(0.06);
    }

    if(pointingMixer !== undefined) {
      pointingMixer.update(0.04);
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

</script>