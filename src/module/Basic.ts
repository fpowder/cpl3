import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap as GSAP } from 'gsap';


/** THREE js 의 모듈들을 정의 */
export const cpl3Scene: Scene = new Scene();
export const gltfLoader: GLTFLoader = new GLTFLoader();

// export const webGLRenderer: WebGLRenderer = new WebGLRenderer();
// export const mixer: undefined | AnimationMixer = undefined;

/* cannon-es basic elements */

/* GSAP */
export const gsap: GSAP = (() => {
    // GSAP.registerPlugin(MotionPathPlugin);
    return GSAP;
})();




