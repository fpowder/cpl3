import { cpl3Scene, gltfLoader, gsap } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction, BoxGeometry, MeshLambertMaterial, QuadraticBezierCurve3, Vector3, Vector} from 'three';
import carGlb from '../asset/resource/models/car.glb';

// ParkingArea move path import
import path from '../config/path';

import { vec3fromObj } from '../module/Util';
export default class Car {

    mesh: Mesh;
    mixer: AnimationMixer;

    moving: boolean;

    forwardAction: AnimationAction;
    backwardAction: AnimationAction;

    stdDistance: number = 4;
    stdSpeed: number = 20;

    startZOffset: number = 12;

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
                this.mesh.position.set(path[0].x, path[0].y, path[0].z - this.startZOffset);
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
        
        const entranceTl = gsap.timeline();
        const movePathTl = gsap.timeline();
        movePathTl.repeat(-1);
        // 주차장 진입 애니매이션 설정
        movePathTl.from(
            this.mesh.position,
            {
                duration: (() => {
                    const dist = this.startZOffset;
                    const basicDuration = this.stdDistance / this.stdSpeed;
                    return basicDuration * ( dist / this.stdDistance );

                    // return 9;
                })(),
                ease: 'none',
                x: path[0].x,
                y: path[0].y,
                z: path[0].z - 12
            }
        );

        // using to for each event
        for(let i = 1; i < path.length; i++) {

            const eachPath = path[i];

            if(eachPath.quadraticPath) {
                const quadraticPath = eachPath.quadraticPath;
                const quadrarticBezier = new QuadraticBezierCurve3(
                    new Vector3(quadraticPath[0].x, quadraticPath[0].y, quadraticPath[0].z),
                    new Vector3(quadraticPath[1].x, quadraticPath[1].y, quadraticPath[1].z),
                    new Vector3(quadraticPath[2].x, quadraticPath[2].y, quadraticPath[2].z)
                );

                const points: Vector3[] = quadrarticBezier.getPoints(10);
                for(let i = 1; i < points.length - 1; i++) {
                    const boxGeo = new BoxGeometry(0.1, 0.5, 0.1);
                    const boxMat = new MeshLambertMaterial({color: 'white'});
                    const boxMesh = new Mesh(boxGeo, boxMat);
                    boxMesh.position.set(points[i].x, points[i].y, points[i].z);
                    cpl3Scene.add(boxMesh);

                    movePathTl.to(
                        this.mesh.position,
                        {
                            ease: 'none',
                            x: points[i].x,
                            y: points[i].y,
                            z: points[i].z,
                            duration: (() => {

                                const dist = points[i].distanceTo(points[i-1]);
                                const basicDuration = this.stdDistance / this.stdSpeed;
                                const duration = basicDuration * ( dist / this.stdDistance ) ;
                                console.log('duration: ', duration);

                                return duration;
                            })(),
                        }
                    );

                }

            } else {
                movePathTl.to(
                    this.mesh.position,
                    {
                        ease: 'none',
                        x: eachPath.x,
                        y: 0,
                        z: eachPath.z,
                        duration: (() => {

                            const dist = vec3fromObj(path[i]).distanceTo(vec3fromObj(path[i-1]));
                            const basicDuration = this.stdDistance / this.stdSpeed;
                            return basicDuration * ( dist / this.stdDistance );

                        })(),
                        onUpdate: () => {
                            // console.log(this.mesh.position);
                        }
                    }
                );
            }

            // movePathTl.to(
            //     this.mesh.position, 
            //     (() => {
                    
            //         if(eachPath.quadraticPath) {
                        
            //             console.log('eachPath.motionPath', eachPath.quadraticPath);

            //             const quadrarticBezier = new QuadraticBezierCurve3(
            //                 new Vector3(47.5, 0, 121),
            //                 new Vector3(52.5, 0, 121),
            //                 new Vector3(52.5, 0, 124)
            //             );
            //             const points = quadrarticBezier.getPoints(10);
            //             console.log('quadratic Points : ', points);

            //             const path = createVec3ObjArr(points);

            //             for(let vec3 of path) {
            //                 const boxGeo = new BoxGeometry(0.1, 0.5, 0.1);
            //                 const boxMat = new MeshLambertMaterial({color: 'white'});
            //                 const boxMesh = new Mesh(boxGeo, boxMat);
            //                 boxMesh.position.set(vec3.x, vec3.y, vec3.z);
            //                 cpl3Scene.add(boxMesh);
            //             }

            //             console.log('path: ', path);

            //             return {
            //                 ease: 'none',
            //                 motionPath: {
            //                     path,

            //                 },
            //                 onUpdate: () => {
            //                     console.log(this.mesh.position);

            //                     const boxGeo = new BoxGeometry(0.1, 0.5, 0.1);
            //                     const boxMat = new MeshLambertMaterial({color: 'red'});
            //                     const boxMesh = new Mesh(boxGeo, boxMat);
            //                     boxMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
            //                     cpl3Scene.add(boxMesh);
            //                 },
            //             }
            //         } else {
            //             return {
            //                 ease: 'none',
            //                 x: eachPath.x,
            //                 y: 0,
            //                 z: eachPath.z,
            //                 onUpdate: () => {
            //                     // console.log(this.mesh.position);
            //                 },
            //             };
            //         }

            //     })(),
            // );

        } // for
    } // moveThroughPath

}