import { AxesHelper, GridHelper } from 'three';
import Stats from 'stats.js';
import settings from '../config/settings';

export default class Helper {;
    axesHelper: AxesHelper;
    gridHelper: GridHelper;
    stats: Stats;

    constructor(cpl3Scene: THREE.Scene) {
        this.axesHelper = new AxesHelper(60);
        this.gridHelper = new GridHelper(143, 143);
        this.stats = new Stats();

        this.gridHelper.position.x = settings.xAdjust;
        this.gridHelper.position.z = settings.zAdjust;
        this.gridHelper.position.y = 0.1;
        document.body.append(this.stats.dom);

        cpl3Scene.add(this.axesHelper);
        // cpl3Scene.add(this.gridHelper);
    }
}