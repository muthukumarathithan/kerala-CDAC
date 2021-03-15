import {SET_LIVE_VEHICLES, SET_LIVE_VEHICLE, SET_VEHICLE_STATUS} from '../actionTypes';

export const liveVehicles = (state = [], action) =>{
    switch(action.type){
        case SET_LIVE_VEHICLES:
            return action.liveVehicles;
        default:
            return state;     

    }


}

export const vehicleStatus = (state = [], action) =>{
    switch(action.type){
        case SET_VEHICLE_STATUS:
            return action.vehicleStatus;
        default:
            return state;     

    }


}

export const liveVehicle = (state = {}, action) =>{
    switch(action.type){
        case SET_LIVE_VEHICLE:
            return action.liveVehicle
        default:
            return state;     
    
    }
    
    
    }