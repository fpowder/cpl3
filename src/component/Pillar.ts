import { BoxGeometry, Mesh, MeshPhongMaterial, Scene } from 'three';
import colors from '../config/colors';
import settings from '../config/settings';
export default class Pillar {

    cpl3Scene: Scene;

    geometry: BoxGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

    positions: Object[];
    meshes: Mesh[] = [];

    width: number = 1;
    height: number = 15;
    depth: number = 1;
    
    constructor(cpl3Scene: Scene, positions: {x: number, z: number[]}[]) {
        this.geometry = new BoxGeometry(this.width, this.height, this.depth);
        this.material = new MeshPhongMaterial({
            color: colors.pillar, 
            transparent: true,
            opacity: 0.6
        });
        this.mesh = new Mesh(this.geometry, this.material);

        for(const set of positions) {
            const xPos: number = set.x;
            const zList: number[] = set.z;

            for(const eachZ of zList) {
                const clone: Mesh = this.mesh.clone();
                clone.position.x = xPos + settings.spacer / 2;
                clone.position.z = eachZ + settings.spacer / 2;
                clone.position.y = this.height / 2;
                this.meshes.push(clone);
                cpl3Scene.add(clone);
            }
        }
    }
}