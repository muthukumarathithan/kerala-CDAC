import {SET_CUSTOMERS, SET_CURRENT_CUSTOMER, REMOVE_CUSTOMER} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setCustomers = customers =>(
    {
        type:SET_CUSTOMERS,
        customers         
 })
 
 export const setCurrentCustomer = customer =>({
        type:SET_CURRENT_CUSTOMER,
        customer
})

export const deleteCustomer = (id) => ({
    type: REMOVE_CUSTOMER,
    payload: id
})

export const getCustomers = () =>{
    return async dispatch =>{
        try {
            const customers = await api.call('get',`customers`);
            dispatch(setCustomers(customers));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserCustomer = () =>{
   return async dispatch =>{
       try {
        const customers = await api.call('get','customers/user');
        dispatch(setCustomers(customers));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentCustomer = (id) =>{
    return async dispatch =>{
        try {
            const customer = await api.call('get',`customers/${id}`);
            dispatch(setCurrentCustomer(customer));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createCustomer = (data, history) =>{
    return async dispatch =>{
        try {
            const customer = await api.call('post','customers', data);
            dispatch(setCurrentCustomer(customer));
            dispatch(removeError());
            history.push('/app/customers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateCustomer = (id, data, history) =>{
    return async dispatch =>{
        try {
            const customer = await api.call('post',`customers/${id}`, data);
            dispatch(setCurrentCustomer(customer));
            dispatch(removeError());
            history.push('/app/customers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeCustomer = (id) =>{
    return async dispatch =>{
        try {
            const customer = await api.call('delete',`customers/${id}`);
            dispatch(deleteCustomer(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  