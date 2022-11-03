
import * as THREE from 'three';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { cpl3Scene } from './module/Basic';

import Floor from './component/Floor';

import Helper from './module/Helper';
import './css/cpl3.css';

// Renderer
const canvas: Element = document.querySelector('#cpl3');
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 70;
camera.lookAt(new THREE.Vector3(0, 0, 0));
cpl3Scene.add(camera);

// Light
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight('white', 0.4);
cpl3Scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 0;
light.position.z = 2;
light.lookAt(0, 0, 0);
cpl3Scene.add(light);

// floor mesh
const cpl3Floor: Floor = new Floor(cpl3Scene); 

// Helper
const helper: Helper = new Helper(cpl3Scene);

// OrbitControls
const control: OrbitControls = new OrbitControls(camera, renderer.domElement);

// test mesh for check position on grid
const testMesh = new Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({color: 'pink'})
);
testMesh.position.y = 0.5;
testMesh.position.x = 1;
cpl3Scene.add(testMesh);

// draw
const clock: THREE.Clock = new THREE.Clock();
const draw = (): void => {
    const time = clock.getElapsedTime();

    // fps update
    helper.stats.update();

    renderer.render(cpl3Scene, camera);
    renderer.setAnimationLoop(draw);
}

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(cpl3Scene, camera);
}

window.addEventListener('resize', setSize);

draw();




