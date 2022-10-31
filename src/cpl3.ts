import * as THREE from 'three';

// Renderer
const canvas: Element = document.querySelector('#cpl3');
const renderer: THREE.Renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});


