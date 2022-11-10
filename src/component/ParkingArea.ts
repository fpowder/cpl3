import { BoxGeometry, Mesh, MeshPhongMaterial, Scene, Vector3 } from 'three';
import parkingAreaCords from '../config/parkingAreaCords';
import { cpl3Scene } from '../module/Basic';
// import settings from '../config/settings';

export default class ParkingArea {
    
    geometry: BoxGeometry;
    material: MeshPhongMaterial;

    mesh: Mesh;

    constructor(cpl3Scene: Scene, cord: {start: number[], vector: number[]}) {

        this.geometry = new BoxGeometry(cord.vector[0], 0.05, cord.vector[1]);
        this.material = new MeshPhongMaterial({color: '#423e80'});

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = cord.start[0] + cord.vector[0] / 2 /* + settings.spacer / 2 */;
        this.mesh.position.y = 0;
        this.mesh.position.z = cord.start[1] + cord.vector[1] / 2 /* + settings.spacer / 2 */;

        cpl3Scene.add(this.mesh);
    }
}

export const createFromCords = () => {
    const areaInfos = parkingAreaCords;
    for(const k in areaInfos) {
        new ParkingArea(cpl3Scene, areaInfos[k].cord);
    }
}