import { gltfLoader  } from '../module/Basic';
import { Mesh, MeshPhongMaterial, Scene } from 'three';
import gateGlb from '../asset/resource/models/gate.glb';
// import gateGlb from '../asset/resource/models/gate2.glb';
import colors from '../config/colors';

export default class Gate {

    arrowMesh: Mesh;
    entranceMesh: Mesh;
    
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

                this.entranceMesh.position.set(34 +  4.5, 0, 107);

                // arrowMesh
                this.arrowMesh = gltf.scene.children[0] as Mesh;
                this.arrowMesh.material = new MeshPhongMaterial({ color: 'seagreen' });
                this.arrowMesh.position.set(34 + 4.5, 0, 107);

                cpl3Scene.add(this.entranceMesh);
                cpl3Scene.add(this.arrowMesh);
            }
        )
    }
}
