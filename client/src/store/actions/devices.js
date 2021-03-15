import {SET_DEVICES, SET_CURRENT_DEVICE, REMOVE_DEVICE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';

 export const setDevices = devices =>(
    {
        type:SET_DEVICES,
        devices         
 })

 export const setCurrentDevice = device =>({
        type:SET_CURRENT_DEVICE,
        device
})

export const deleteDevice = (id) => ({
    type: REMOVE_DEVICE,
    payload: id
})

export const getDevices = () =>{
    return async dispatch =>{
        try {
            const devices = await api.call('get',`devices`);
            dispatch(setDevices(devices));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserDevice = () =>{
   return async dispatch =>{
       try {
        const devices = await api.call('get','devices/user');
        dispatch(setDevices(devices));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentDevice = (id) =>{
    return async dispatch =>{
        try {
            const device = await api.call('get',`devices/${id}`);
            dispatch(setCurrentDevice(device));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const createDevice = (data, history) =>{
    return async dispatch =>{
        try {
            const device = await api.call('post','devices', data);
            dispatch(setCurrentDevice(device));
            dispatch(removeError());
            history.push('/app/devices');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateDevice = (id, data, history) =>{
    return async dispatch =>{
        try {
            const device = await api.call('post',`devices/${id}`, data);
            dispatch(setCurrentDevice(device));
            dispatch(removeError());
            history.push('/app/devices');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}



export const removeDevice = (id) =>{
    return async dispatch =>{
        try {
            const device = await api.call('delete',`devices/${id}`);
            dispatch(deleteDevice(id));
            dispatch(removeError());

        } catch (error) {
            alert(error)
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  