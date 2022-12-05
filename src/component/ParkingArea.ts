import { timingSafeEqual } from 'crypto';
import { BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshPhongMaterial, Scene } from 'three';
import parkingAreaCords from '../config/parkingAreaCords';
import { cpl3Scene } from '../module/Basic';
// import settings from '../config/settings';

export default class ParkingArea {
    
    geometry: BoxGeometry;
    material: MeshPhongMaterial;

    mesh: Mesh;

    constructor(cpl3Scene: Scene, cord: {start: number[], vector: number[]}) {

        this.geometry = new BoxGeometry(cord.vector[0], 0, cord.vector[1]);
        this.geometry.scale(0.98, 1, 0.98);
        this.material = new MeshPhongMaterial({color: '#423e80'});
        this.material.polygonOffset = true;
        this.material.polygonOffsetFactor = -3;
        this.material.polygonOffsetUnits = 0.1;

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = cord.start[0] + cord.vector[0] / 2 /* + settings.spacer / 2 */;
        this.mesh.position.y = 0;
        this.mesh.position.z = cord.start[1] + cord.vector[1] / 2 /* + settings.spacer / 2 */;

        // parking area border
        const borderGeo = new EdgesGeometry(this.geometry);
        const borderMat = new LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
        borderMat.polygonOffset = true;
        borderMat.polygonOffsetFactor = -3;
        borderMat.polygonOffsetUnits = 0.1;
        
        const wireframe = new LineSegments(borderGeo, borderMat);
        wireframe.material.polygonOffset = true;
        wireframe.material.polygonOffsetFactor = -3;
        wireframe.material.polygonOffsetUnits = 0.1;

        wireframe.position.x = this.mesh.position.x;
        wireframe.position.y = this.mesh.position.y;
        wireframe.position.z = this.mesh.position.z;

        cpl3Scene.add(this.mesh, wireframe);
    }
}

export const createFromCords = () => {
    const areaInfos = parkingAreaCords;
    for(const k in areaInfos) {
        new ParkingArea(cpl3Scene, areaInfos[k].cord);
    }
}