import { gltfLoader  } from '../module/Basic';
import { Mesh, MeshPhongMaterial, Scene } from 'three';
import gateGlb from '../asset/resource/models/gate.glb';
import colors from '../config/colors';

export default class Gate {

    mesh: Mesh;
    
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
                
                this.mesh = gltf.scene.children[0] as Mesh;
                this.mesh.material = new MeshPhongMaterial({
                    color: colors.gate
                });
                // position test
                this.mesh.position.set(34 +  4.5, 0, 107);

                cpl3Scene.add(this.mesh);
            }
        )
    }
}
