import Car from "../component/Car";
import { cpl3Scene } from "../module/Basic";

class CarManager {
    cars: Car[] =[];
    constructor() {

    }

    getCars() {
        return this.cars;
    }

    addCar(car: Car) {
        this.cars.push(car);
    }

    removeCar(meshId:number) {
        this.cars.filter(car => {
            if(car.mesh.id === meshId) {
                car.mesh.clear();
                cpl3Scene.remove(car.mesh);
            }
        })
    }
}

export const carManager = new CarManager();