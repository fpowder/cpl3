import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import settings from '../config/settings';
export default class Controls {
    orbitControls: OrbitControls;

    constructor(camera: THREE.Camera, element: HTMLElement) {
        this.orbitControls = new OrbitControls(camera, element);
        // this.orbitControls.target.set(settings.xAdjust, 0, settings.zAdjust);
        this.orbitControls.target.set(29.5, 0, 71.5);
    }
}