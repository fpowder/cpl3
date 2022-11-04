const settings = ((): {
    xGridCnt: number,
    zGridCnt: number,
    xCenters: number[],
    zCenters: number[],
    xCordinates: number[],
    zCordinates: number[],
    xAdjust: number,
    zAdjust: number,
    spacer: 1
} => {
    const xGridCnt: number = 59;
    const zGridCnt: number = 143;

    const xCordinates: number[] = [];
    const zCordinates: number[] = [];

    const xCenters: number[] = [];
    const zCenters: number[] = [];

    const spacer: number = 1;

    // adjust x, z values for 3d environment
    const xAdjust = - (xGridCnt * spacer / 2);
    const zAdjust = - (zGridCnt * spacer / 2);

    for (let x = 0; x < xGridCnt; x++) {
        xCordinates.push(x * spacer + xAdjust);
        if(x !== xGridCnt) {
            xCenters.push(x * spacer + (spacer / 2) + xAdjust);
        }
    }

    for (let z = 0; z < zGridCnt; z++) {
        zCordinates.push(z * spacer + zAdjust);
        if(z !== xGridCnt) {
            zCenters.push(z * spacer + (spacer / 2) + zAdjust);
        }
    }

    return {
        xGridCnt: xGridCnt,
        zGridCnt: zGridCnt,
        xCenters: xCenters,
        zCenters: zCenters,
        xCordinates: xCordinates,
        zCordinates: zCordinates,
        xAdjust: xGridCnt / 2,
        zAdjust: zGridCnt / 2,
        spacer: 1
    }
})();

export default settings;