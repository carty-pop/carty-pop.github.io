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

const SateliteScene = new THREE.Scene();

// Configuración de los pasos de post-procesamiento
const renderPass = new RenderPass(SateliteScene, camera);
composer.addPass(renderPass);

const afterimagePass = new AfterimagePass();
composer.addPass(afterimagePass);


scene.add( cube );
scene.add( light );
scene.add( helper );
scene.add(ambientLight);


const sateliteGeometry = new THREE.BoxGeometry( 1, 1, 1 );;
const sateliteMaterial =  new THREE.MeshStandardMaterial( { color: 0x049ef4 } );
const sateliteGroup = new THREE.Group();
function AddSatelite(){
    const satelite = new THREE.Mesh( sateliteGeometry, sateliteMaterial);
    const sateliteParent = new THREE.Object3D();
    let randomPosSatelite = Math.floor(Math.random() * (10 - 2 + 1) + 2);
    satelite.position.x = randomPosSatelite;
    sateliteParent.add(satelite);
    sateliteGroup.add(sateliteParent);
    SateliteScene.add(sateliteGroup);
    sateliteParent.userData.rx = Math.random() * 0.01 - 0.005; 
    sateliteParent.userData.ry = Math.random() * 0.01 - 0.005; 
    sateliteParent.userData.rz = Math.random() * 0.01 - 0.005;
}


const randomSatelite = document.getElementById('satelite');
randomSatelite.addEventListener('click', AddSatelite);

function animate() {
	requestAnimationFrame( animate );
	if(cubeRotSpeed < 10){
        cube.rotation.y += cubeRotSpeed;
        cubeRotSpeed += 0.01;

        if(cubeRotSpeed > 0.7 && cubeRotSpeed < 10){
            betweenCubeRotSpeed = true
        }
    }
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


	composer.render();

}
animate();
