import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Controls {
    control: OrbitControls;

    constructor(camera: THREE.Camera, element: HTMLElement) {
        this.control = new OrbitControls(camera, element);
    }
}