import { cpl3Scene, gltfLoader, gsap } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction, BoxGeometry, MeshLambertMaterial } from 'three';
import carGlb from '../asset/resource/models/car.glb';

// ParkingArea move path import
import path from '../config/path';
export default class Car {

    mesh: Mesh;
    mixer: AnimationMixer;

    moving: boolean;

    forwardAction: AnimationAction;
    backwardAction: AnimationAction;


    constructor(cpl3Scene: Scene) {
        
        gltfLoader.load(
            carGlb,
            (gltf) => {
                gltf.scene.traverse(child => {
                    console.log(child);
                    
                    if((child as Mesh).isMesh) {
                        child.castShadow = true;
                    }
                });
                console.log(gltf.scene.children[0]);
                console.log(gltf.animations);
                this.mesh = gltf.scene.children[0] as Mesh;

                // temporary position
                this.mesh.position.set(38.5, 0, 113.5);
                // this.mesh.position.set(14 , 1.3, 84.5);
                
                // cast shadow true
                this.mesh.castShadow = true;
                cpl3Scene.add(this.mesh);

                this.mesh.animations = gltf.animations;

                this.mixer = new AnimationMixer(this.mesh);
                
                this.forwardAction = this.mixer.clipAction(gltf.animations[1]);
                this.forwardAction.clampWhenFinished = true;
                this.forwardAction.play();

                this.backwardAction = this.mixer.clipAction(gltf.animations[0]);
                this.backwardAction.clampWhenFinished = true;

                this.moveThroughPath();

            }
        );
    }

    moveThroughPath() {
        
        // using motion path
        // gsap.to(this.mesh.position, {
        //     duration: 20,
        //     // repeat: -1,
        //     ease: 'none',
        //     motionPath: {
        //         path,
        //         autoRotate: true,
        //         useRadians: true
        //     }
        // });

        const movePathTl = gsap.timeline();
        movePathTl.repeat(-1);
        movePathTl.from(
            this.mesh.position,
            {
                duration: 1,
                ease: 'none',
                x: path[0].x,
                y: path[0].y,
                z: path[0].z - 6
            }
        );

        // using to for each event
        for(let eachPath of path) {
            movePathTl.to(
                this.mesh.position, 
                (() => {
                    
                    if(eachPath.motionPath) {
                        return {
                            ease: 'none',
                            motionPath: {
                                path: eachPath.motionPath,
                                alignOrigin: [0.5, 0.5, 0.5],
                                autoRotate: true,
                                useRadians: true,
                                type: 'curve',
                            },
                            onUpdate: () => {
                                console.log(this.mesh.position);

                                const boxGeo = new BoxGeometry(0.1, 0.5, 0.1);
                                const boxMat = new MeshLambertMaterial({color: 'white'});
                                const boxMesh = new Mesh(boxGeo, boxMat);
                                boxMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
                                cpl3Scene.add(boxMesh);
                            },
                        }
                    } else {
                        return {
                            ease: 'none',
                            x: eachPath.x,
                            y: 0,
                            z: eachPath.z,
                            onUpdate: () => {
                                // console.log(this.mesh.position);
                            },
                        };
                    }

                })(),
            );
        } // for
    }
}