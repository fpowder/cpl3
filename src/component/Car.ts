import { gltfLoader, gsap } from '../module/Basic';
import { MathUtils, AnimationMixer, Mesh, Scene, AnimationAction, BoxGeometry, MeshLambertMaterial, QuadraticBezierCurve3, Vector3, Vector} from 'three';
import carGlb from '../asset/resource/models/car.glb';

// ParkingArea move path import
import path from '../config/path';

import { vec3fromObj, drawBezierPath } from '../module/Util';
export default class Car {

    mesh: Mesh;
    mixer: AnimationMixer;

    moving: boolean;

    forwardAction: AnimationAction;
    backwardAction: AnimationAction;

    stdDistance: number = 4;
    stdSpeed: number = 20;

    bezierPoints: number = 30;
    startZOffset: number = 20;

    act: string = 'entrance'; // entrance, moving, parking, exit
    direction: string; // -x, +x, -z, +z

    parked: boolean = false;
    wayout: boolean = false;

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

                // entrance position
                this.mesh.position.set(path[0].x, path[0].y, path[0].z - this.startZOffset);
                
                // cast shadow true
                this.mesh.castShadow = true;
                cpl3Scene.add(this.mesh);

                // car wheel animation set
                this.mesh.animations = gltf.animations;
                this.mixer = new AnimationMixer(this.mesh);
                
                this.forwardAction = this.mixer.clipAction(gltf.animations[1]);
                this.forwardAction.clampWhenFinished = true;
                this.forwardAction.play();

                this.backwardAction = this.mixer.clipAction(gltf.animations[0]);
                this.backwardAction.clampWhenFinished = true;

                // entrance animation start
                this.moveEntrancePath();

            }
        );
    }

    moveEntrancePath(): void {
        
        const entranceTl = gsap.timeline();

        // 주차장 진입 애니매이션 설정
        entranceTl.to(
            this.mesh.position,
            {
                ease: 'none',
                x: path[0].x,
                y: path[0].y,
                z: path[0].z,
                duration: (() => {
                    const dist = this.startZOffset;
                    const basicDuration = this.stdDistance / this.stdSpeed;

                    const finalDuration = basicDuration * ( dist / this.stdDistance );
                    return finalDuration;
                })()
            }
        ); // entranceTl.to

        const quadraticPath = path[1].quadraticPath;
        this.bezierPath(entranceTl, quadraticPath, () => {
            /**
             *  entrance 애니메이션 종료 후, 주차장 경로를 따라 이동하는 함수 호출
             *  */
            this.mesh.lookAt(new Vector3(47.5, 0, 121));
            this.movePath();
        });

    } // moveEntrancePath

    movePath(): void {
        this.mesh.position.set(path[1].x, path[1].y, path[1].z);

        // 주차장 경로 트래킹
        const movePathTl = gsap.timeline();
        movePathTl.repeat(-1);
        // using to for each event
        for(let i = 2; i < path.length; i++) {

            const eachPath = path[i];

            if(eachPath.quadraticPath) {
                this.bezierPath(movePathTl, eachPath.quadraticPath);

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
                            this.mesh.lookAt(new Vector3(path[i].x, path[i].y, path[i].z));
                        }
                    }
                );
            }
        } // for
    } // movePath

    bezierPath(
        timeline: gsap.core.Timeline, 
        quadraticPath: {x: number, y: number, z: number}[], 
        onComplete?: gsap.Callback
    ): void {

        const quadrarticBezier = new QuadraticBezierCurve3(
            new Vector3(quadraticPath[0].x, quadraticPath[0].y, quadraticPath[0].z),
            new Vector3(quadraticPath[1].x, quadraticPath[1].y, quadraticPath[1].z),
            new Vector3(quadraticPath[2].x, quadraticPath[2].y, quadraticPath[2].z)
        );
        
        const points: Vector3[] = quadrarticBezier.getPoints(this.bezierPoints);

        // draw quadratic bezier points
        drawBezierPath(points);

        for(let i = 1; i < points.length - 1; i++) {
            if(i !== points.length - 2){
                
                timeline.to(
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

                            return duration;
                        })(),
                        onUpdate: () => {
                            this.mesh.lookAt(points[i]);
                        }
                    }
                );

            } else {
                timeline.to(
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

                            return duration;
                        })(),
                        onComplete: onComplete,
                        onUpdate: () => {
                            this.mesh.lookAt(points[i]);
                        }
                    }
                );
            } // if else
        }

    }

}