import { BoxGeometry, Mesh, MeshPhongMaterial, Scene } from 'three';
import settings from '../config/settings';

export default class ParkingArea {
    
    geometry: BoxGeometry;
    material: MeshPhongMaterial;

    mesh: Mesh;

    constructor(cpl3Scene: Scene) {
        this.geometry = new BoxGeometry(6, 0.1, 10);
        this.material = new MeshPhongMaterial({color: 'pink'});

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = 11 + 6 / 2 + settings.spacer / 2;
        this.mesh.position.z = 2 + 10 / 2 + settings.spacer / 2;
        this.mesh.position.y = 0;

        cpl3Scene.add(this.mesh);
    }
}