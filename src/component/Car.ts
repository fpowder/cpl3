import { gltfLoader } from '../module/Basic';
import { AnimationMixer, Mesh, Scene, AnimationAction } from 'three';
import carGlb from '../asset/resource/models/car.glb';
export default class Car {

    mesh: Mesh;
    actions: AnimationAction [] = [];

    mixer: AnimationMixer;

    constructor(cpl3Scene: Scene) {

        gltfLoader.load(
            carGlb,
            (gltf) => {
                gltf.scene.traverse(child => {
                    if((child as Mesh).isMesh) {
                        child.castShadow = true;
                    }
                });
                console.log(gltf.scene.children[0]);
                console.log(gltf.animations);
                const mesh = gltf.scene.children[0];
                mesh.position.set(10, 1.3, 120);

                cpl3Scene.add(mesh);

                mesh.animations = gltf.animations;

                this.mixer = new AnimationMixer(mesh);
                const forwardAction = this.mixer.clipAction(gltf.animations[1]);
                forwardAction.clampWhenFinished = true;
                forwardAction.play();

                // this.mesh = gltf.scene.children[0] as Mesh;
                // this.mesh.position.set(23, 1, 72);
                // this.mesh.castShadow = true;

                // cpl3Scene.add(this.mesh);

                // this.mesh.animations = gltf.animations;
                // this.mixer = new AnimationMixer(this.mesh);
                // console.log(gltf.animations);

                // this.actions[0] = this.mixer.clipAction(this.mesh.animations[0]);
                // this.actions[0].play();
            }
        );
    }
}