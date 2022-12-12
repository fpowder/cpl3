import { radToDeg } from 'three/src/math/MathUtils';
import { Vector3 } from 'three';

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
