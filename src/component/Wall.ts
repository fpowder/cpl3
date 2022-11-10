// import { Box } from 'cannon-es';
import { BoxGeometry, Material, Mesh, MeshPhongMaterial, Scene } from 'three';
import { cpl3Scene } from '../module/Basic';

import settings from '../config/settings';
import colors from '../config/colors';

import wallLayerRange from '../config/wallLayerRange';

export default class Wall {

    cpl3Scene: Scene;

    geometry: BoxGeometry;
    material: Material;
    mesh: Mesh;

    width: number = 1;
    thickness: number = 1;

    constructor(cpl3Scene: Scene, xCord: number, zRanges: number[][]) {

        for(const zRange of zRanges) {
            const eachDepth = zRange[1] - zRange[0] + 1;
            this.geometry = new BoxGeometry(this.width, this.thickness, eachDepth);
            this.material = new MeshPhongMaterial({color: colors.wall});
            this.mesh = new Mesh(this.geometry, this.material);

            this.mesh.position.x = xCord - settings.spacer / 2;
            this.mesh.position.z = zRange[0] + eachDepth / 2 - 1;
            this.mesh.position.y = this.thickness / 2;

            cpl3Scene.add(this.mesh);
        };

    }
}

export const createFromRanges = () => {
    for(const xCord in wallLayerRange) {
        new Wall(cpl3Scene, parseInt(xCord), wallLayerRange[xCord]);
    }
}

