import { gltfLoader } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction } from 'three';
import carGlb from '../asset/resource/models/car.glb';
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
                this.mesh.position.set(20, 1.3, 74);
                
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

            }
        );
    }
}