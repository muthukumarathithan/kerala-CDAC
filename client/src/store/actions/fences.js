import {SET_VEHICLES, SET_CURRENT_VEHICLE, REMOVE_VEHICLE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';

 export const setVehicles = vehicles =>(
    {
        type:SET_VEHICLES,
        vehicles         
 })

 export const setCurrentVehicle = vehicle =>({
        type:SET_CURRENT_VEHICLE,
        vehicle
})

export const deleteVehicle = (id) => ({
    type: REMOVE_VEHICLE,
    payload: id
})

export const getFences = () =>{
    return async dispatch =>{
        try {
            const vehicles = await api.call('get',`vehicles`);
            dispatch(setVehicles(vehicles));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserVehicle = () =>{
   return async dispatch =>{
       try {
        const vehicles = await api.call('get','vehicles/user');
        dispatch(setVehicles(vehicles));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentVehicle = (id) =>{
    return async dispatch =>{
        try {
            const vehicle = await api.call('get',`vehicles/${id}`);
            dispatch(setCurrentVehicle(vehicle));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const createVehicle = (data, history) =>{
    return async dispatch =>{
        try {
            const vehicle = await api.call('post','vehicles', data);
            dispatch(setCurrentVehicle(vehicle));
            dispatch(removeError());
            history.push('/app/vehicles');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateVehicle = (id, data, history) =>{
    return async dispatch =>{
        try {
            const vehicle = await api.call('post',`vehicles/${id}`, data);
            dispatch(setCurrentVehicle(vehicle));
            dispatch(removeError());
            history.push('/app/vehicles');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}



export const removeFence = (id) =>{
    return async dispatch =>{
        try {
            const vehicle = await api.call('delete',`vehicles/${id}`);
            dispatch(deleteVehicle(id));
            dispatch(removeError());

        } catch (error) {
            alert(error)
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  