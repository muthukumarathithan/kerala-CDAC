import {SET_DEVICES, SET_CURRENT_DEVICE, REMOVE_DEVICE} from '../actionTypes';

export const devices = (state = [], action) =>{
    switch(action.type){
        case SET_DEVICES:
            return action.devices;
        case REMOVE_DEVICE:
            var state = state.filter((item) => item._id !== action.payload);
            return state; 
        default:
            return state;     

    }


}

export const currentDevice = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_DEVICE:
            return action.device;
        default:
            return state;     
    
    }
    
    
    }