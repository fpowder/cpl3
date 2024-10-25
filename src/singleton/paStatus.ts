import parkingAreaCords from '../config/parkingAreaCords';

// current parkingArea status
class CurrentParkingLot {
	
	paStatus: {} = {};

	constructor() {
		// paStatus initialize
		const keys = Object.keys(parkingAreaCords) ;
		for(let paKey of keys) {
			(this.paStatus)[paKey] = {};
		}
	}
}

const currentCpl = new CurrentParkingLot();

export const paStatus = currentCpl.paStatus;