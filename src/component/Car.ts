import { cpl3Scene, gltfLoader, gsap, clock } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction, BoxGeometry, MeshLambertMaterial, QuadraticBezierCurve3, Vector3, Raycaster, Object3D } from 'three';
import carGlb from '../asset/resource/models/car.glb';

// ParkingArea move path import
import path from '../config/path';

// current cpl status
import { paStatus } from "../singleton/paStatus";

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
    direction: string = 'forward'; // forward, backward

    parked: boolean = false;
    wayout: boolean = false;

    entranceTl: gsap.core.Timeline = gsap.timeline();
    movePathTl: gsap.core.Timeline = gsap.timeline();

    timeline: gsap.core.Timeline = gsap.timeline({
        onUpdate: () => {
            
        }
    });

	parkingTl: gsap.core.Timeline = gsap.timeline();
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
    
    stoppedTime: number;

    reversing: boolean = false;

    constructor(cpl3Scene: Scene, stdSpeed: number) {
        this.stdSpeed = stdSpeed;
        gltfLoader.load(
            carGlb,
            (gltf) => {

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
        
        this.timeline.add(this.entranceTl);

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
                onStart:(() => {

                }),
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
                // this.entranceTl.progress(1).reverse();
            }
        );

    } // moveEntrancePath

    movePath(): void {

        this.timeline.add(this.movePathTl);
        this.mesh.userData.act = 'moving';

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
						onStart: () => {
							const nextPath = new Vector3(path[i].x, path[i].y, path[i].z);
							this.mesh.lookAt(nextPath);
						},
                        onUpdate: () => {
							console.log('onUpdate this.mesh.getWorldDirection', this.mesh.getWorldDirection(new Vector3()))
                        },
                        onComplete: () => {
							console.log('onComplete this.mesh.getWorldDirection', this.mesh.getWorldDirection(new Vector3()));
							
							// determine park action
                            const chance = Math.random() * 1;
                            if(
								path[i].parkTo === 30
							) {	
								const parkingScalar = 3;
								const currentPosition = this.mesh.position.clone();
								const directionVec = this.mesh.getWorldDirection(new Vector3()).clone();

								const upperVec = directionVec.normalize().multiplyScalar(parkingScalar);

								console.log('currentMeshPosition', currentPosition);
								console.log('upper way add 4 position', currentPosition.clone().add(upperVec));

								const upperPosition = currentPosition.clone().add(upperVec);

								const yAxis = new Vector3(0, 1, 0);
								const rightVec = directionVec
                                                    .clone()
                                                    .applyAxisAngle(yAxis.clone(), - (Math.PI / 2))
                                                    .normalize()
                                                    .multiplyScalar(parkingScalar);

								const rightUpperPostion = upperPosition.clone().add(rightVec);

								console.log('currentPosition', currentPosition);
								console.log('upperPosition', upperPosition);
								console.log('rightUpperPosition', rightUpperPostion);

                                // add mesh on right upper position
                                const boxGeo = new BoxGeometry(0.05, 0.5, 0.05);
                                const boxMat = new MeshLambertMaterial({color: 'white'});
                                const boxMesh = new Mesh(boxGeo, boxMat);
                                boxMesh.position.set(rightUpperPostion.x, rightUpperPostion.y, rightUpperPostion.z);
                                boxMesh.clone().position.set(currentPosition.x, currentPosition.y, currentPosition.z);
                                boxMesh.clone().position.set(upperPosition.x, upperPosition.y, upperPosition.z);
                                cpl3Scene.add(boxMesh);
                                
                                const direction = new Vector3();
                                direction
                                    .subVectors(rightUpperPostion.clone(), upperPosition.clone())
                                    .normalize()
                                    .multiplyScalar(parkingScalar);

                                const nRightPosition = rightUpperPostion.clone().add(direction);

                                const nRightBox = boxMesh.clone();
                                nRightBox.position.set(nRightPosition.x, nRightPosition.y, nRightPosition.z)
                                cpl3Scene.add(nRightBox);

                                const nUpperVec = directionVec
                                                        .clone()
                                                        .normalize()
                                                        .multiplyScalar(parkingScalar);
                                const nLeftUpperPosition = nRightPosition.clone().add(nUpperVec);

                                const nRightUpperBox = boxMesh.clone();
                                nRightUpperBox.position.set(nLeftUpperPosition.x, nLeftUpperPosition.y, nLeftUpperPosition.z);
                                cpl3Scene.add(nRightUpperBox);

                                this.bezierPath(
									this.parkingTl,
									[currentPosition, upperPosition, rightUpperPostion],
									this.mesh.position
								);

								this.bezierPath(
									this.parkingTl,
									[rightUpperPostion, nRightPosition, nLeftUpperPosition],
									this.mesh.position,
									() => {
										this.direction = 'backward';
										this.parkingTl.pause();
										setTimeout(() => {
											this.parkingTl.resume();
										}, 1000);
									}
								);
								
								const backVec = directionVec
													.clone()
													.applyAxisAngle(yAxis.clone(), - Math.PI)
													.normalize()
													.multiplyScalar(parkingScalar * 2);

								const backwardPos = nLeftUpperPosition.clone().add(backVec);
								
								this.bezierPath(
									this.parkingTl,
									[nLeftUpperPosition, backwardPos, currentPosition],
									this.mesh.position
								);

								// set current act to 'parking'
								this.act = 'parking';
								// clear current timeline
                                this.timeline.clear();
								// set parked status true
								paStatus[path[i].parkTo].parked = true;

                            }

                            /** reverse test code */
                            /* if(path[i].parkTo && path[i].parkTo === 55) {
                                this.timeline.reverse();

                                setTimeout(() => {
                                    this.timeline.play();
                                }, 2000);
                            } */
                            
                        }
                    }
                );
            }
        } // for

    } // movePath

    bezierPath(
        timeline: gsap.core.Timeline, 
        quadraticPath: {x: number, y: number, z: number}[] | Vector3[],
        meshPosition: Vector3,
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
			timeline.to(
				meshPosition,
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
					onStart: () => {
						if(this.direction === 'backward') {
							this.mesh.lookAt(
								this.mesh.position.add(
									points[i].sub(this.mesh.position)
								)
							)
						} else {
							this.mesh.lookAt(points[i]);
						}
					},
					onUpdate: () => {

					},
					onComplete: () => {
						// onComplete event triggiered when last bazier timeline complete
						if(i == points.length - 2) {
							onComplete();
						}
					}
				}
			);
        }

    }

    sensorRay(): any {
        if(this.reversing === true) return;

        const sensorPos: Vector3 = this.frontSensor.getWorldPosition(new Vector3());
        const direct = this.frontSensor.getWorldDirection(new Vector3());
        direct.normalize();
        this.frontSensorRay.set(sensorPos, direct);

        // cpl3Scene.add(
        //     new ArrowHelper(this.frontSensorRay.ray.direction, this.frontSensorRay.ray.origin, 10, 0x00ff00)
        // );

        const intersects = this.frontSensorRay.intersectObjects(cpl3Scene.children);
        for(const item of intersects) {
            
            if(item.object.parent?.parent?.name === 'car') console.log('distance with front car', item.distance);

            if(
                item.object.parent?.parent?.name === 'car' 
                &&
                item.distance < 5
                &&
                item.object.parent?.parent?.userData.act === 'moving'
            ) {
                // console.log('distance lower than 5');
                // console.log('car ray ', true);
                // this.stopped = true;
                this.stoppedTime = clock.getElapsedTime();
                this.timeline.pause();
                break;
            } else if(
                item.object.parent?.parent?.name !== 'car' 
                && 
                clock.getElapsedTime() - this.stoppedTime > 0.6
                && 
                item.distance >= 5
            ) {    
                this.timeline.resume();
                break;
            } else if(this.reversing === false && item.object.parent?.parent?.userData.act === 'parking') {
                this.reversing = true;
                this.timeline.reverse();
                break;
            }
        }
    }
}