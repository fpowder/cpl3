import { cpl3Scene, gltfLoader, gsap } from '../module/Basic';
import { MathUtils, Ray, AnimationMixer, Mesh, Scene, AnimationAction, BoxGeometry, MeshLambertMaterial, QuadraticBezierCurve3, Vector3, Vector, LineBasicMaterial, Line, BufferGeometry, Object3D, ArrowHelper, Raycaster, Box3, IcosahedronGeometry} from 'three';
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
    stdSpeed: number;

    bezierPoints: number = 30;
    startZOffset: number = 20;

    act: string = 'entrance'; // entrance, moving, parking, exit
    direction: string; // -x, +x, -z, +z

    parked: boolean = false;
    wayout: boolean = false;

    entranceTl: gsap.core.Timeline = gsap.timeline();
    movePathTl: gsap.core.Timeline = gsap.timeline();

    timeline: gsap.core.Timeline = gsap.timeline();
    // nextPath: Vector3;

    frontSensor: Mesh = new Mesh(
        new BoxGeometry(0.3, 0.3, 0.3),
        new MeshLambertMaterial({
            color: 0x599532,
            flatShading: true 
        })
    );

    frontSensorRay: Raycaster = new Raycaster();
    frontSensorHeight: number = 1.5;
    
    constructor(cpl3Scene: Scene, stdSpeed: number) {
        this.stdSpeed = stdSpeed;
        gltfLoader.load(
            carGlb,
            (gltf) => {

                // timeline integration
                this.timeline.add(this.entranceTl).add(this.movePathTl);

                gltf.scene.traverse(child => {
                    console.log(child);
                    
                    if((child as Mesh).isMesh) {
                        child.castShadow = true;
                    }
                });
                console.log('gltf.scene.children[0] : ',gltf.scene.children[0]);
                // console.log(gltf.animations);
                this.mesh = gltf.scene.children[0] as Mesh;

                this.mesh.name = 'car';

                // entrance position
                this.mesh.position.set(path[0].x, path[0].y, path[0].z - this.startZOffset);

                // frontSesor add
                this.frontSensor.position.set(0, this.frontSensorHeight, 4.9);
                this.mesh.add(this.frontSensor);
                
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
        
        // 주차장 진입 애니매이션 설정
        this.entranceTl.to(
            // this.mesh.position,
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
                })(),
                onUpdate: (() => {
                    // this.sensorRay(new Vector3(path[0].x, path[0].y, path[0].z));
                })
            }
        ); // entranceTl.to

        const quadraticPath = path[1].quadraticPath;
        this.bezierPath(
            this.entranceTl, 
            quadraticPath, 
            this.mesh.position, 
            () => {
                /**
                 *  entrance 애니메이션 종료 후, 주차장 경로를 따라 이동하는 함수 호출
                 *  */
                this.mesh.lookAt(new Vector3(47.5, 0, 121));
                this.movePath();
            }
        );

    } // moveEntrancePath

    movePath(): void {
        this.mesh.position.set(path[1].x, path[1].y, path[1].z);

        // 주차장 경로 트래킹
        this.movePathTl.repeat(-1);
        // using to for each event
        for(let i = 2; i < path.length; i++) {

            const eachPath = path[i];

            if(eachPath.quadraticPath) {
                this.bezierPath(this.movePathTl, eachPath.quadraticPath, this.mesh.position);

            } else { 
                this.movePathTl.to(
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
                            const nextPath = new Vector3(path[i].x, path[i].y, path[i].z);
                            this.mesh.lookAt(nextPath);
                            // this.sensorRay(nextPath);
                            // this.nextPath = nextPath;
                        }
                    }
                );
            }
        } // for

        // this.timeline.eventCallback('onUpdate', this.sensorRay, [this.nextPath]);
    } // movePath

    bezierPath(
        timeline: gsap.core.Timeline, 
        quadraticPath: {x: number, y: number, z: number}[],
        positions: Vector3,
        onComplete?: gsap.Callback,
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
                    positions,
                    {
                        ease: 'none',
                        x: points[i].x,
                        y: points[i].y,
                        z: points[i].z,
                        duration: (() => {
                            const dist = points[i].distanceTo(points[i-1]);
                            const basicDuration = this.stdDistance / this.stdSpeed;
                            const duration = basicDuration * ( dist / this.stdDistance );

                            return duration;
                        })(),
                        onUpdate: () => {
                            this.mesh.lookAt(points[i]);
                            // this.sensorRay(points[i]);
                            // this.nextPath = points[i];
                        }
                    }
                );

            } else {
                timeline.to(
                    positions,
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
                            // this.sensorRay(points[i]);
                            // this.nextPath = points[i];
                        }
                    }
                );
            } // if else    
        }

    }

    /* sensorRay(direction: Vector3): any {

        if(this.mesh && direction.distanceTo(this.mesh.position) > 0.1) {
           // this.frontSensor.lookAt(direction);
           
            const sensorPos: Vector3 = this.frontSensor.getWorldPosition(new Vector3());
            
            // raycasting 방향은 현재 차량 mesh position과 다음 경로의 position간 vector를 계산해야댐
            const carPos: Vector3 = this.mesh.position;
            const rayDirect: Vector3 = new Vector3(direction.x - carPos.x, 0, direction.z - carPos.z);
            rayDirect.normalize();

            // frontSensor와 계산된 vector로 raycasting
            this.frontSensorRay.set(sensorPos, rayDirect);
            
            // cpl3Scene.add(
            //     new ArrowHelper(this.frontSensorRay.ray.direction, this.frontSensorRay.ray.origin, 10, 0x00ff00)
            // );

            const intersects = this.frontSensorRay.intersectObjects(cpl3Scene.children);
            for(const item of intersects) {

                
                if(item.object.parent?.parent?.name === 'car') console.log(item.distance);

                if(
                    item.object.parent?.parent?.name === 'car' 
                    &&
                    item.distance < 3 
                ) {
                    this.timeline.pause();
                    console.log('car ray ', true);
                    
                } else {
                    this.timeline.resume();
                }
                break;
                
            }
        }
        
    } */

    sensorRay(): any {
        // this.frontSensor.lookAt(direction);

        const sensorPos: Vector3 = this.frontSensor.getWorldPosition(new Vector3());

        // frontSensor와 계산된 vector로 raycasting
        const direct = this.frontSensor.getWorldDirection(new Vector3());
        direct.normalize()
        this.frontSensorRay.set(sensorPos, direct);

        // cpl3Scene.add(
        //     new ArrowHelper(this.frontSensorRay.ray.direction, this.frontSensorRay.ray.origin, 10, 0x00ff00)
        // );

        const intersects = this.frontSensorRay.intersectObjects(cpl3Scene.children);
        for(const item of intersects) {
            
            if(item.object.parent?.parent?.name === 'car') console.log(item.distance);

            if(
                item.object.parent?.parent?.name === 'car' 
                &&
                item.distance < 3 
            ) {
                this.timeline.pause();
                console.log('car ray ', true);
                break;
                
            } else {
                this.timeline.resume();
                console.log('car ray ', false);
                break;
            }
        }
    }
}