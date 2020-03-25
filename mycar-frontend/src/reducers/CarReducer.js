import { 
    CARS_LIST_LOADING,
    ADD_CAR_REQUEST,
    CARS_LIST_ERROR, 
    CARS_LIST_SUCCESS,
    CARS_LIST_REQUEST
} from "../actions/CarsListActions";
import { LOADING, LOADED, ERROR } from "../componentStatus";

const initialState={
  cars: [],
  status: LOADING,
  error: ''
}

export default function CarReducer(state = initialState, action) {
  const {
    car,
    cars,
    error
    } = action.payload || {};
    switch(action.type) {
        case ADD_CAR_REQUEST:
          return {...state, cars:[...state.cars, car], status:LOADED, error: ''};
        case CARS_LIST_REQUEST:
          return {...state, status:LOADING, error:''}
        case CARS_LIST_LOADING:
          return {...state, cars:[], status:LOADING, error:''}
        case CARS_LIST_SUCCESS:
          return {...state, cars:cars, status:LOADED, error:''}
        case CARS_LIST_ERROR:
          return {...state, cars: [], status:ERROR, error};
        default:
          return state;
      }
}