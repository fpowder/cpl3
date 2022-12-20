import { CylinderGeometry, Mesh, MeshLambertMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Cpl3Scene from '../component/Scene';

// import font from '../asset/resource/font/helvetiker_regular.typeface.json';
// import font from 'three/examples/fonts/helvetiker_regular.typeface.json';

import parkingAreaCords from '../config/parkingAreaCords';
import path from '../config/path';

export default class Path extends Cpl3Scene{

    paCenters: {x: number, z: number}[] = new Array();
    path: { x?: number, y?: number, z?: number, quadraticPath?: any[]} [] = path;
    


    constructor() {
        super();
    }

    setPaCenters(): Path {
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

    async setPANumber(): Promise<Path> {

        // for(const k in parkingAreaCords) {

        //     const letter: string = k;
        //     const textGeo = new TextGeometry(
        //         letter,
        //         {
        //             font: new Font(font),
        //             size: 3,
        //             height: 3,
        //             curveSegments: 12,
        //             bevelEnabled: true,
        //             bevelThickness: 10,
        //             bevelSize: 8,
        //             bevelOffset: 0,
        //             bevelSegments: 5
        //         }
        //     );
        //     const textMat = new MeshLambertMaterial({color: 'white'});
        //     const textMesh = new Mesh(textGeo, textMat);
        //     textMesh.position.set(0, 10, 0);

        //     this.cpl3Scene.add(textMesh);
        // }
        
        // new FontLoader().load('/asset/resource/font/helvetiker_regular.typeface.json', (font: Font) => {
        //     console.log('font', font);
        // });

        const font = await new FontLoader().loadAsync('/asset/resource/font/helvetiker_regular.typeface.json');
        console.log('loaded font with sync', font);
        for(const k in parkingAreaCords) {
            console.log('k', k);
            const letter: string = k;
            const textGeo = new TextGeometry(
                letter,
                {
                    font: font,
                    size: 2,
                    height: 0.2,
                    curveSegments: 3,
                    // bevelSize: 1,
                    // bevelOffset: 0,
                    // bevelSegments: 1
                }
            );
            const textMat = new MeshLambertMaterial({color: 'white'});
            const textMesh = new Mesh(textGeo, textMat);
            
            const eachCord = parkingAreaCords[k].cord;
            const start = eachCord.start;
            const vector = eachCord.vector;

            textMesh.position.set(start[0] + vector[0] / 2 - 1.5, 0.3, start[1] + vector[1] / 2);

            this.cpl3Scene.add(textMesh)
        }

        return this;
    }
    
    setDotsOnPACenters(): Path {
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

    setDotsOnPath(): Path {
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