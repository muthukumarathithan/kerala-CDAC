import {SET_DEALERS, SET_CURRENT_DEALER, REMOVE_DEALER} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';

 export const setDealers = dealers =>(
    {
        type:SET_DEALERS,
        dealers         
 })

 export const setCurrentDealer = dealer =>({
        type:SET_CURRENT_DEALER,
        dealer
})

export const deleteDealer = (id) => ({
       type: REMOVE_DEALER,
       payload: id
 })

export const getDealers = () =>{
    return async dispatch =>{
        try {
            const dealers = await api.call('get',`dealers`);
            dispatch(setDealers(dealers));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getCurrentDealer = (id) =>{
    return async dispatch =>{
        try {
            const dealer = await api.call('get',`dealers/${id}`);
            dispatch(setCurrentDealer(dealer));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createDealer = (data, history) =>{
    return async dispatch =>{
        try {
            const dealer = await api.call('post','dealers', data);
            dispatch(setCurrentDealer(dealer));
            dispatch(removeError());
            history.push('/app/dealers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateDealer = (id, data, history) =>{
    return async dispatch =>{
        try {
            const dealer = await api.call('post',`dealers/${id}`, data);
            dispatch(setCurrentDealer(dealer));
            dispatch(removeError());
            history.push('/app/dealers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}



export const removeDealer = (id) =>{
    return async dispatch =>{
        try {
            const dealer = await api.call('delete',`dealers/${id}`);
            dispatch(deleteDealer(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  
