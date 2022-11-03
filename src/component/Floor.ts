import * as THREE from 'three';
import settings from '../config/settings';
import colors from '../config/colors';

export default class Floor {

    cpl3Scene: THREE.Scene;

    geometry: THREE.BoxGeometry;
    material: THREE.MeshPhongMaterial;
    mesh: THREE.Mesh;

    thickness: number = 1;
    yAdjust: number = -this.thickness / 2 ;

    constructor(cpl3Scene: THREE.Scene) {

        // 임시 컬러 사용, 추후 라이트 추가후에 설정값의 조명색으로 변경 필요
        this.geometry = new THREE.BoxGeometry(settings.xGridCnt, this.thickness, settings.zGridCnt);
        this.material = new THREE.MeshPhongMaterial({color: '#ffe9ac'});
        // this.material = new THREE.MeshPhongMaterial({color: colors.floor});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        // position for e-avp data
        this.mesh.position.x = settings.xAdjust;
        this.mesh.position.z = settings.zAdjust;

         // 바닥두께의 절반 만큼 아래로
         this.mesh.position.y = this.yAdjust;
        // this.mesh.position.z = 3;

        cpl3Scene.add(this.mesh);
        
    }
}