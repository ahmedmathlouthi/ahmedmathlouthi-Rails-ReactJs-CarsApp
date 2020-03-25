
import { combineReducers } from 'redux';
import  TaskReducer  from './TaskReducer';
import CarReducer  from './CarReducer';

export default function CombinedReducers() {
    return combineReducers({
        carsList: CarReducer,
        tasksList: TaskReducer,
       
    });
}
