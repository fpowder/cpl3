import { gltfLoader  } from '../module/Basic';
import { Mesh, MeshPhongMaterial, Scene } from 'three';
import gateGlb from '../asset/resource/models/gate.glb';
// import gateGlb from '../asset/resource/models/gate2.glb';
import colors from '../config/colors';

export default class Gate {

    entranceArrowMesh: Mesh;
    entranceMesh: Mesh;

    exitArrowMesh: Mesh;
    exitMesh: Mesh;
    
    constructor(cpl3Scene: Scene) {
        gltfLoader.load(
            gateGlb,
            (gltf) => {
                gltf.scene.traverse(child => {
                    console.log('gate meshes');
                    console.log(child);
                    console.log((child as Mesh).isMesh);

                    if((child as Mesh).isMesh) {
                        child.castShadow = true;
                    }
                });
                console.log(gltf.scene.children);
                
                // entranceMesh
                this.entranceMesh = gltf.scene.children[1] as Mesh;
                this.entranceMesh.material = new MeshPhongMaterial({ color: colors.gate });
                this.entranceMesh.material.polygonOffset = true;
                this.entranceMesh.material.polygonOffsetFactor = -2;
                this.entranceMesh.material.polygonOffsetUnits = 0.1;
                // this.entranceMesh.material.depthTest = true;
                // cpl3Scene.overrideMaterial = this.entranceMesh.material;
                
                // exitMesh (34, 40)
                this.exitMesh = this.entranceMesh.clone();
                
                // entranceArrowMesh
                this.entranceArrowMesh = gltf.scene.children[0] as Mesh;
                this.entranceArrowMesh.material = new MeshPhongMaterial({ color: 'seagreen' });

                // exitArrowMesh
                this.exitArrowMesh = this.entranceArrowMesh.clone();

                // gate position
                this.entranceMesh.position.set(34 +  4.5, 0, 107);
                this.exitMesh.position.set(34 + 4.5, 0, 40 + 8);
                this.exitMesh.rotateY(Math.PI);

                // arrow position
                this.entranceArrowMesh.position.set(34 + 4.5, 0, 107);
                this.exitArrowMesh.position.set(34 + 4.5, 0, 40 + 8);
                this.exitArrowMesh.rotateY(Math.PI);

                cpl3Scene.add(this.entranceMesh);
                cpl3Scene.add(this.entranceArrowMesh);

                cpl3Scene.add(this.exitMesh);
                cpl3Scene.add(this.exitArrowMesh);
            }
        )
    }
}
