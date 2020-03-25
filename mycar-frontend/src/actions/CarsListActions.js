export const ADD_CAR_REQUEST = 'ADD_CAR_REQUEST';
export const CARS_LIST_REQUEST = 'CARS_LIST_REQUEST';
export const CARS_LIST_LOADING = 'CARS_LIST_LOADING';
export const CARS_LIST_SUCCESS = 'CARS_LIST_SUCCESS';
export const CARS_LIST_ERROR = 'CARS_LIST_ERROR';
export const DELETE_CAR_REQUEST = 'DELETE_CAR_REQUEST';
export const DELETE_CAR_LOADING = 'DELETE_CAR_LOADING';
export const DELETE_CAR_SUCCESS = 'DELETE_CAR_SUCCESS';
export const DELETE_CAR_ERROR = 'DELETE_CAR_ERROR';

// Action creators

export function addCarRequest(car){
    const payload = {
        car
    }
    return { type : ADD_CAR_REQUEST, payload }
}

export function carsListRequest() {
    const payload = {};
    return { type: CARS_LIST_REQUEST, payload };
}

export function carsListLoading() {
    const payload = {};
    return { type: CARS_LIST_LOADING, payload };
}

export function carsListSuccess(cars) {
    const payload = {
        cars
    };
    return { type: CARS_LIST_SUCCESS, payload };
}

export function carsListError(error) {
    const payload = {
        error
    };
    return { type: CARS_LIST_ERROR, payload };
}

export function deleteCarRequest(carID) {
    const payload = {
        carID
    };
    return { type: DELETE_CAR_REQUEST, payload };
}

export function deleteCarLoading() {
    const payload = {};
    return { type: DELETE_CAR_LOADING, payload };
}

export function deleteCarSuccess(carID) {
    const payload = {
        carID
    };
    return { type: DELETE_CAR_SUCCESS, payload };
}

export function deletecarError(error) {
    const payload = {
        error
    };
    return { type: DELETE_CAR_ERROR, payload };
}