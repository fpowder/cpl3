import { CylinderGeometry, Mesh, MeshLambertMaterial } from 'three';
import Cpl3Scene from '../component/Scene';

import parkingAreaCords from '../config/parkingAreaCords';
import path from '../config/path';

export default class Path extends Cpl3Scene{

    paCenters: {x: number, z: number}[] = new Array();
    path: { x?: number, y?: number, z?: number, motionPath?: any[]} [] = path;
    
    constructor() {
        super();
    }

    setPaCenters() {

        for(const k in parkingAreaCords) {
            const eachCord = parkingAreaCords[k].cord;
            const start = eachCord.start;
            const vector = eachCord.vector;
        
            this.paCenters.push({
                x: start[0] + vector[0] / 2,
                z: start[1] + vector[1] / 2
            });
        }
        // console.log(this.paCenters);
        return this;
    }

    setDotsOnPACenters() {
        const dotGeo = new CylinderGeometry(0.5, 0.5, 0.3, 20);
        const dotMat = new MeshLambertMaterial({color: '#96e0d8'});
        dotMat.polygonOffset = true;
        dotMat.polygonOffsetFactor = -4;
        dotMat.polygonOffsetUnits = 0.1;
        
        // console.log(this.paCenters);

        for(let each of this.paCenters) {
            const dot = new Mesh(dotGeo, dotMat);
            dot.position.set(each.x, 0, each.z);
            this.cpl3Scene.add(dot);
        }

        return this;
    }

    setDotsOnPath() {
        const dotGeo = new CylinderGeometry(0.5, 0.5, 0.3, 20);
        const dotMat = new MeshLambertMaterial({color: '#f7d67c'});
        dotMat.polygonOffset = true;
        dotMat.polygonOffsetFactor = -4;
        dotMat.polygonOffsetUnits = 0.1;

        for(let each of this.path) {
            const dot = new Mesh(dotGeo, dotMat);
            dot.position.set(each.x, 0, each.z);
            this.cpl3Scene.add(dot);
        }

        return this;
    }

};