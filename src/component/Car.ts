import { gltfLoader } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction } from 'three';
import carGlb from '../asset/resource/models/car.glb';

// GSAP
import gsap from 'gsap';

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
                    console.log((child as Mesh).isMesh);
                    
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
        // using to for each event
        for(let eachPath of path) {
            movePathTl.to(
                this.mesh.position, 
                (() => {
                    return {
                        duration: 1,
                        ease: 'none',
                        x: eachPath.x,
                        y: 0,
                        z: eachPath.z,
                        onUpdate: () => {
                            console.log(this.mesh.position);
                        },
                        motionPath: {
                            path: path,
                            // alignOrigin: [0.5, 0.5, 0.5],
                            autoRotate: true,
                            useRadians: true
                        },
                        
                    };
                })(),
            );
        } // for
    }
}