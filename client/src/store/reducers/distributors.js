import {SET_DISTRIBUTORS, SET_CURRENT_DISTRIBUTOR, REMOVE_DISTRIBUTOR} from '../actionTypes';

export const distributors = (state = [], action) =>{
    switch(action.type){
        case SET_DISTRIBUTORS:
            return action.distributors;
        case REMOVE_DISTRIBUTOR:
            var state = state.filter((item) => item._id !== action.payload);
            return state;    
        default:
            return state;     

    }


} 

export const currentDistributor = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_DISTRIBUTOR:
            return action.distributor
        default:
            return state;     
    
    }
    
    
    }