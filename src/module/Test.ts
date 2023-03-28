import { Vector3 } from 'three';
export const multipleBezierPath = (
	// pointCnt: number,
	// startCord: vec3Obj,
	// endCord: vec3Obj,
	// segments: number
) => {
	

	// Define the start and end positions
	const startPosition = new Vector3(0, 0, 0);
	const endPosition = new Vector3(50, 50, 0);

	// Define the number of segments to create
	const segmentCount = 2;

	// Calculate the distance between the start and end positions
	const distance = endPosition.distanceTo(startPosition);

	// Calculate the length of each segment
	const segmentLength = distance / segmentCount;

	// Calculate the direction of the vector from start to end position
	const direction = new Vector3().subVectors(endPosition, startPosition).normalize();

	// Create an array to hold the segment positions
	const segmentPositions = [];

	// Calculate the position of each segment
	for (let i = 0; i <= segmentCount; i++) {
		const segmentPosition = new Vector3().copy(direction).multiplyScalar(i * segmentLength).add(startPosition);
		segmentPositions.push(segmentPosition);
	}

	console.log(segmentPositions);

	// const wayVec = new Vector3(0, 1, 0);
	let flag = -1;
	for (let i = 0; i < segmentCount; i++) {
		const segment: Vector3 = segmentPositions[i+1].sub(segmentPositions[i]);
		const zAxis = new Vector3(0, 0, 1);
		const inversedSeg = segment.clone().applyAxisAngle(zAxis.clone(), Math.PI);
		console.log('inveredSeg', inversedSeg);
		if(flag === -1) {
			const symmetryVec = new Vector3(inversedSeg.x, -inversedSeg.y, 0);
			const applyVec = symmetryVec.clone().sub(inversedSeg).multiplyScalar(0.5);
			const quadraticPoint = segmentPositions[i].add(applyVec);
			flag = 1;
			console.log('quadraticPoint', quadraticPoint);
		} 
	}

}

multipleBezierPath();