
import * as THREE from 'three';

import { cpl3Scene } from './module/Basic';

// gsap
import gsap  from 'gsap';

// scene components
import Floor from './component/Floor';
import { createFromCords } from './component/ParkingArea';
import Pillar from './component/Pillar';
import { createFromRanges } from './component/Wall';

// parking Area 
import Path from './module/Path';

// threejs modules
import Controls from './module/Control';
import Helper from './module/Helper';

import settings from './config/settings';

import Car from './component/Car';
import Gate from './component/Gate';
import colors from './config/colors';
import './css/cpl3.css';

// Renderer
const canvas: Element = document.querySelector('#cpl3');
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// shadow
renderer.shadowMap.enabled = true;

// Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.x = settings.xAdjust;
camera.position.y = settings.xAdjust * 2;
camera.position.z = settings.zAdjust * 2.5;
camera.lookAt(new THREE.Vector3(settings.xAdjust, 0, 40));

// vertical camera position set for path view
// camera.position.set(29.5, 70, 71.5);
// camera.rotation.y += Math.PI/2
// camera.lookAt(new THREE.Vector3(29.5, 0, 71.5));

cpl3Scene.add(camera);

// OrbitControls
const controls: Controls = new Controls(camera, renderer.domElement);
controls.orbitControls.update();

// Light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight('white', 0.5);
cpl3Scene.add(ambientLight);

const lightHeight = 30;
const spotLight1 = new THREE.SpotLight(colors.spotLight, 0.4);

spotLight1.shadow.mapSize.width = 2048;
spotLight1.shadow.mapSize.height = 2048;
spotLight1.target.position.set(settings.xGridCnt / 2, 0, settings.zGridCnt / 2);

const spotLight2 = spotLight1.clone();
const spotLight3 = spotLight1.clone();
const spotLight4 = spotLight1.clone();

const sideSpotLight1 = spotLight1.clone();
const sideSpotLight2 = spotLight1.clone();

spotLight1.position.set(-10, lightHeight, 0);
spotLight2.position.set(69, lightHeight, 0);
spotLight3.position.set(-10, lightHeight, 153);
spotLight4.position.set(69, lightHeight, 153);

sideSpotLight1.position.set(99, lightHeight - 15, 143 / 2);
sideSpotLight2.position.set(-40, lightHeight - 15, 143 / 2);

cpl3Scene.add(spotLight1.target);
cpl3Scene.add(spotLight2.target);
cpl3Scene.add(spotLight3.target);
cpl3Scene.add(spotLight4.target);

cpl3Scene.add(sideSpotLight1.target);
cpl3Scene.add(sideSpotLight2.target);

// set spotLight Helper
const spotLight1Helper = new THREE.SpotLightHelper(spotLight1, 'seagreen');
const spotLight2Helper = new THREE.SpotLightHelper(spotLight2, 'red');
const spotLight3Helper = new THREE.SpotLightHelper(spotLight3, 'blue');
const spotLight4Helper = new THREE.SpotLightHelper(spotLight4, 'pink');

const sideSpot1Helper = new THREE.SpotLightHelper(sideSpotLight1, 'white');
const sideSpot2Helper = new THREE.SpotLightHelper(sideSpotLight2, 'white');

spotLight1.castShadow = true;

cpl3Scene.add(spotLight1, spotLight2, spotLight3, spotLight4, sideSpotLight1, sideSpotLight2);
// cpl3Scene.add(spotLight1Helper, spotLight2Helper, spotLight3Helper, spotLight4Helper);
cpl3Scene.add(sideSpot1Helper, sideSpot2Helper);

spotLight1Helper.update();

/* const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 0;
light.position.y = 0;
light.position.z = 71.5;
light.rotation.z = Math.PI / 2;
const lightHelper = new DirectionalLightHelper(light, 10);
cpl3Scene.add(lightHelper); */

// floor
const cpl3Floor: Floor = new Floor(cpl3Scene); 

// pillars in parkingLot
const pillarPositions: { x: number, z: number[]}[] = [
    { x: 10, z: [32, 47, 62, 77, 92, 105, 117] },
    { x: 23, z: [11, 32, 47, 62, 77, 92, 105, 117, 130] },
    { x: 32, z: [32, 47, 62, 77, 92, 105, 117] },
    { x: 33, z: [130] },
    { x: 34, z: [11] },
    { x: 44, z: [130] },
    { x: 55, z: [130] },
];
new Pillar(cpl3Scene, pillarPositions);

// test parking Area
createFromCords();

// test create wall layer
createFromRanges();
// new Wall(cpl3Scene, 1, [[1, 143]]);

// Parking Area centers
new Path()
    .setPaCenters()
    // .setDotsOnPACenters()
    // .setDotsOnPath()
    .setPANumber()
    .setPathNum();

// Helper
const helper: Helper = new Helper(cpl3Scene);

// test mesh for check position on grid
// const testMesh = new Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshPhongMaterial({color: 'pink'})
// );
// testMesh.position.y = 0.5;
// testMesh.position.x = 1;
// cpl3Scene.add(testMesh);

// sample car from glb
const car = new Car(cpl3Scene, 10);
const car2 = new Car(cpl3Scene, 20);

// sample gate from glb
const gate = new Gate(cpl3Scene);

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // controls.orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(cpl3Scene, camera);
}

window.addEventListener('resize', setSize);

// draw (threejs version)
// const clock: THREE.Clock = new THREE.Clock();
// const draw = (): void => {
//     // const time = clock.getElapsedTime();
//     const delta = clock.getDelta();
//     const time = clock.getElapsedTime();
//     console.log('time : ', time);                            
//     // console.log('delta : ', delta);

//     if(car.mixer) {
//         car.mixer.update(delta);
//     }
//     // fps update
//     helper.stats.update();

//     renderer.render(cpl3Scene, camera);
//     renderer.setAnimationLoop(draw);

//     spotLight1Helper.update();
//     spotLight2Helper.update();
//     spotLight3Helper.update();
//     spotLight4Helper.update();

//     sideSpot1Helper.update();
//     sideSpot2Helper.update();
    
// }
// draw();


// draw (gsap ticker version);
const clock: THREE.Clock = new THREE.Clock();
const render = () => {

    // console.log('time : ', time);
    // console.log('delta : ', delta);
    // console.log('frame : ', frame);
    // const delta = clock.getDelta();

    const delta = clock.getDelta();

    // fps update
    helper.stats.update();

    if(car.mixer) {
        car.mixer.update(delta);
    }
    // renderer.setAnimationLoop(render);
    // renderer.render(cpl3Scene, camera);
    renderer.setAnimationLoop(() => {
        if(car.mixer) car.mixer.update(delta);
        
    });
    renderer.render(cpl3Scene, camera);
    spotLight1Helper.update();
    spotLight2Helper.update();
    spotLight3Helper.update();
    spotLight4Helper.update();

    sideSpot1Helper.update();
    sideSpot2Helper.update();

}

gsap.ticker.add(render);
gsap.ticker.fps(120);


