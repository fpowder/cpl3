import { radToDeg } from 'three/src/math/MathUtils';
import { Vector3, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { cpl3Scene } from './Basic';
import parkingAreaCords from '../config/parkingAreaCords';
import { workerData } from 'worker_threads';

export const getPaCord = (paNum: number): {x: number, y: number, z: number} | null => {
	if(parkingAreaCords[paNum]) {
		const paCord = parkingAreaCords[paNum].cord;
		const x = paCord.start[0] + paCord.vector[0] / 2;
		const z = paCord.start[1] + paCord.vector[1] / 2;
		return { x, y: 0, z }
	}
}

export const vec3FromObj = (cord: {x: number, y: number, z: number}) => {
    return new Vector3(cord.x, cord.y, cord.z);
}

export const drawBezierPath = (points: Vector3[]) => {
    for(let vec3 of points) {
        const boxGeo = new BoxGeometry(0.05, 0.5, 0.05);
        const boxMat = new MeshLambertMaterial({color: 'white'});
        const boxMesh = new Mesh(boxGeo, boxMat);
        boxMesh.position.set(vec3.x, vec3.y, vec3.z);
        cpl3Scene.add(boxMesh);
    }
}

export const createVec3ObjArr = (vec3Arr: Vector3[]) :any[]  => {
    const result = [];
    for(let eachVector of vec3Arr) {
        result.push({
            x: eachVector.x,
            y: eachVector.y,
            z: eachVector.z
        });
    }

    console.log('createVec3ObjArr result: ', result);
    return result
}

export const getPAVerticalLength = (PANum: number): number => {
	const paInfo = parkingAreaCords[PANum];
	const paCordVec = paInfo.cord.vector;

	return paCordVec[0] >= paCordVec[1] ? paCordVec[0] : paCordVec[1];	
}

export const createRoundPath = (
    startDeg: number, pointsCnt: number,
    startCord: vec3Obj,
    endCord: vec3Obj
) : Object[] => {
    const gap = Math.PI / 2 / pointsCnt;
    const result = [];

    result.push(startCord);
    for(let i = 0; i < pointsCnt; i++) {
        if(!(i === 0 || i === pointsCnt - 1)) {

            const deg = startDeg + (gap * i);
            console.log(radToDeg(deg));

            const nextX = startCord.x + (Math.cos(gap * i));
            const nextZ = startCord.z + (Math.sin(gap * i));
            result.push({x: nextX, y: 0, z: nextZ});
        }
    }
    result.push(endCord);

    return result;
}


export const createPath = (
    pointCnt: number,
    startCord: vec3Obj, 
    endCord: vec3Obj
) => {
    
    const result = [];
    result.push(startCord);

    const xLength = endCord.x - startCord.x;
    const zLength = endCord.z - startCord.z;

    const xGap = xLength / pointCnt;
    const zGap = zLength / pointCnt;

    for(let i = 0; i < pointCnt; i++) {
        if(!(i === 0 || i === pointCnt - 1)){

            result.push({
                x: startCord.x + i * xGap,
                y: 0,
                z: startCord.z + i * zGap
            });
        }
    }

    console.log('created Path');
    console.log(result);

    result.push(endCord);
    
    return result;
}

export const bezierPath = (
    pointCnt: number,
    startCord: vec3Obj, 
    endCord: vec3Obj
) => {
    
    const result = [];
    result.push(startCord);

    const xLength = endCord.x - startCord.x;
    const zLength = endCord.z - startCord.z;

    const xGap = xLength / pointCnt;
    const zGap = zLength / pointCnt;

    for(let i = 0; i < pointCnt; i++) {
        if(!(i === 0 || i === pointCnt - 1)){
            const aCord = { x: startCord.x + i * xGap, y: 0, z: startCord.z };
            const bCord = { x: startCord.x, y: 0, z: startCord.z + i * zGap };

            result.push({
                x: (aCord.x + bCord.x) / 2,
                y: 0,
                z: (aCord.z + bCord.z) / 2
            });
        }
    }

    result.push(endCord);
    
    return result;
}

/**
 * corrent worldDirection Vector
 * ex) {x: -0.003, y: 0, z: -0.9999} => {x: 0, y: 0, z: -1}
 * @returns Vector3 Object
 */
export const correctDirection = (vector3: Vector3): Vector3 => {
	const x = vector3.x;
	const y = vector3.y;
	const z = vector3.z;

	return new Vector3(Math.round(x), Math.round(y), Math.round(z));
}

export const pathDivide = (segmentCnt: number, startPos: Vector3, endPos: Vector3): Vector3[] => {
	const points = [];
	for(let i = 0; i <= segmentCnt; i++) {
		const point = new Vector3().lerpVectors(startPos, endPos, i / segmentCnt);
		points.push(point);
	}
	return points;
}
