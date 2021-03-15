import {SET_DISTRIBUTORS, SET_CURRENT_DISTRIBUTOR, REMOVE_DISTRIBUTOR} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';

 export const setDistributors = distributors =>(
    {
        type:SET_DISTRIBUTORS,
        distributors         
 })

 export const setCurrentDistributor = distributor =>({
        type:SET_CURRENT_DISTRIBUTOR,
        distributor
})

export const deleteDistributor = (id) => ({
    type: REMOVE_DISTRIBUTOR,
    payload: id
})

export const getDistributors = () =>{
    return async dispatch =>{
        try {
            const distributors = await api.call('get',`distributors`);
            dispatch(setDistributors(distributors));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}


export const createDistributor = (data, history) =>{
    return async dispatch =>{
        try {
            const distributor = await api.call('post','distributors', data);
            dispatch(setCurrentDistributor(distributor));
            dispatch(removeError());
            history.push('/app/distributors');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateDistributor = (id, data, history) =>{
    return async dispatch =>{
        try {
            const distributor = await api.call('post',`distributors/${id}`, data);
            dispatch(setCurrentDistributor(distributor));
            dispatch(removeError());
            history.push('/app/distributors');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const getCurrentDistributor = (id) =>{
    return async dispatch =>{
        try {
            const distributor = await api.call('get',`distributors/${id}`);
            dispatch(setCurrentDistributor(distributor));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const removeDistributor = (id) =>{
    return async dispatch =>{
        try {
            const dealer = await api.call('delete',`distributors/${id}`);
            dispatch(deleteDistributor(id));
            dispatch(removeError());

        } catch (error) {
            alert(error)
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  