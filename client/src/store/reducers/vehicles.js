import {SET_VEHICLES, SET_CURRENT_VEHICLE, REMOVE_VEHICLE} from '../actionTypes';

export const vehicles = (state = [], action) =>{
    switch(action.type){
        case SET_VEHICLES:
            return action.vehicles;
        case REMOVE_VEHICLE:
            var state = state.filter((item) => item._id !== action.payload);
            return state; 
        default:
            return state;     

    }


}

export const currentVehicle = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_VEHICLE:
            return action.vehicle;
        default:
            return state;     
    
    }
    
    
    }