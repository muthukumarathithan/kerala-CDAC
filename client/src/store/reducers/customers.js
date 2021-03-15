import {SET_CUSTOMERS, SET_CURRENT_CUSTOMER, REMOVE_CUSTOMER} from '../actionTypes';

export const customers = (state = [], action) =>{
    switch(action.type){
        case SET_CUSTOMERS:
            return action.customers;
        case REMOVE_CUSTOMER:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentCustomer = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_CUSTOMER:
            return action.customer
        default:
            return state;     
    
    }
    
    
    }