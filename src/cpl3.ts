import * as THREE from 'three';
import './css/cpl3.css';

// Renderer
const canvas: Element = document.querySelector('#cpl3');
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 1;
light.position.z = 2;
scene.add(light);
// Mesh
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 'seagreen'
});
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// draw
const clock: THREE.Clock = new THREE.Clock();
const draw = (): void => {
    const time = clock.getElapsedTime();

    mesh.rotation.y = 2 * time;
    mesh.position.y = time;
    if(mesh.position.y > 3) {
        mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    renderer.setAnimationLoop(draw);
}

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

window.addEventListener('resize', setSize);

draw();




