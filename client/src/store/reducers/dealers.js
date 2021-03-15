import {SET_DEALERS, SET_CURRENT_DEALER, REMOVE_DEALER} from '../actionTypes';

export const dealers = (state = [], action) =>{
    switch(action.type){
        case SET_DEALERS:
            return action.dealers;
        case REMOVE_DEALER:
            var state = state.filter((item) => item._id !== action.payload);
            return state; 

        default:
            return state;     

    }


}



export const currentDealer = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_DEALER:
            return action.dealer
        default:
            return state;     
    
    }
    
    
    }