import parkingAreaCords from '../config/parkingAreaCords';

// current parkingArea status
class cpl {
	
	paStatus: {} = {};

	constructor() {
		// paStatus initialize
		const keys = Object.keys(parkingAreaCords) ;
		for(let paKey of keys) {
			(this.paStatus)[paKey] = {};
		}
	}
}

const currentCpl = new cpl();

export const paStatus = currentCpl.paStatus;