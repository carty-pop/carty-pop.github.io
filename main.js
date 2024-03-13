import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { AmbientLight } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';


const picker = document.getElementById('color');

function getColor(){
    return picker.value;
}

picker.addEventListener('input', function(){
    let hashtagColor = getColor();
    let hexColor = parseInt(hashtagColor.slice(1), 16);
    
    cubeMaterial.color.setHex(hexColor);

})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 20;


const ambientLight = new AmbientLight(0xe99ced, 1);
const light = new THREE.DirectionalLight(0xffffff, 5);
const helper = new THREE.DirectionalLightHelper( light, 5 );
light.position.set(1, 1, 1);

const cubeGeometry = new THREE.BoxGeometry( 2, 2, 2 );
const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0x049ef4 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);


// Configuración de los pasos de post-procesamiento
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const afterimagePass = new AfterimagePass();
composer.addPass(afterimagePass);


scene.add( cube );
scene.add( light );
// scene.add( helper );
scene.add(ambientLight);

let sateliteColor = "";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    sateliteColor = '#';
    for (var i = 0; i < 6; i++) {
       sateliteColor += letters[Math.floor(Math.random() * 16)];
    }
    return sateliteColor;
   }
const sateliteGeometry = new THREE.BoxGeometry( 1, 1, 1 );;
const sateliteGroup = new THREE.Group();
function AddSatelite(){
    sateliteColor = getRandomColor();
    const sateliteMaterial =  new THREE.MeshStandardMaterial( { color: sateliteColor } );
    const satelite = new THREE.Mesh( sateliteGeometry, sateliteMaterial);
    const sateliteParent = new THREE.Object3D();
    let randomPosSatelite = Math.floor(Math.random() * (15 - 2 + 1) + 2);
    satelite.position.x = randomPosSatelite;
    sateliteParent.add(satelite);
    sateliteGroup.add(sateliteParent);
    scene.add(sateliteGroup);
    if(randomPosSatelite < 5){
        sateliteParent.userData.rx = Math.random() * 0.05 - 0.02; 
        sateliteParent.userData.ry = Math.random() * 0.05 - 0.02; 
        sateliteParent.userData.rz = Math.random() * 0.05 - 0.02;
    } else {
        sateliteParent.userData.rx = Math.random() * 0.01 - 0.005; 
        sateliteParent.userData.ry = Math.random() * 0.01 - 0.005; 
        sateliteParent.userData.rz = Math.random() * 0.01 - 0.005;
    }
}


const randomSatelite = document.getElementById('satelite');
randomSatelite.addEventListener('click', AddSatelite);





let randomExe;
let exes  = ["x", "y", "z"];
let usedExe = "";
function randomMove(){
    randomExe = exes[Math.floor(Math.random() * exes.length)];
    if(usedExe !== ""){
        exes.push(usedExe);
        usedExe = "";
    }
    for (var i = exes.length - 1; i >= 0; i--) {
        if (exes[i] === randomExe) {
            exes.splice(i, 1);
        }
    }
    usedExe = randomExe;
    console.log(exes);
    console.log(randomExe);
  
}

const randomButton = document.getElementById('random');
randomButton.addEventListener('click', randomMove);
const stopButton = document.getElementById('stop');
stopButton.addEventListener("click", function(){
    randomExe = "";
})



function animate() {
	requestAnimationFrame( animate );
    if(randomExe === "x"){
        cube.rotation.x += 0.01;
    } else if (randomExe === "y"){
        cube.rotation.y += 0.01;
    } else if (randomExe === "z"){
        cube.rotation.z += 0.01;
    }

    sateliteGroup.traverse(function(object) {
        if (object instanceof THREE.Object3D && object.userData.rx !== undefined) {
            object.rotation.x += object.userData.rx;
            object.rotation.y += object.userData.ry;
            object.rotation.z += object.userData.rz;
        }
    });


	composer.render(scene, camera);

}
animate();

let objects = [cube]
document.addEventListener('keydown', function(event){
    if(event.key === "r"){
        cube.rotation.set(0, 0, 0);
    }
})

const controls = new DragControls(objects, camera, renderer.domElement);

controls.mode = 'rotate';
controls.rotateSpeed = 5;





