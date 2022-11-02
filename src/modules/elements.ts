import { AnimationMixer, BoxGeometry, MeshPhongMaterial, Scene } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/** THREE js 의 모듈들을 정의 */
export const scene: THREE.Scene = new Scene();
export const gltfLoader: GLTFLoader = new GLTFLoader();

// threejs basic elements
export const basic: { 
    scene: THREE.Scene, 
    gltfLoader: GLTFLoader, 
    mixer : undefined | AnimationMixer 
} = {
    scene: new Scene(),
    gltfLoader: new GLTFLoader(),
    mixer: undefined,
};

// cannon-es basic elements


// colors for mesh
export const colors: {
    background: string,
    light: string,
    pillar: string,
    floor: string
} = {
    background: '#3e1322',   
    light: '#ffe9ac',
    pillar: '#071d28',
    floor: '#111',
};

// geometry
export const geometry: {
    floor: THREE.BoxGeometry,
    pillar: THREE.BoxGeometry
} = {
    floor: new BoxGeometry(59, 1, 143),
    pillar: new BoxGeometry()
}

// material
export const material: {
    floor: THREE.MeshPhongMaterial
} = {
    floor: new MeshPhongMaterial({ color: colors.floor }),
}

