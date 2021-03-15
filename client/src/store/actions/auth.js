import {addError, removeError} from './error';
import {SET_CURRENT_USER} from '../actionTypes'
import api from '../../services/api';

export const setCurrentUser = user => {
    return {
        type:SET_CURRENT_USER,
        user
    }
}

export const setToken = token => {
    api.setToken(token);
}

export const logout = () => {
  return dispatch =>{
    localStorage.clear();
    api.setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
    
  }
}

export const authUser = (path, data, history) =>{
    return async dispatch => {
        try {
            const {token, ...user} = await api.call('post',`auth/${path}`,data);
            api.setToken(token);
            localStorage.setItem('token', token);
            dispatch(setCurrentUser(user));
            dispatch(removeError());
        } catch (error) {
          const err = error.response.data.err;
          dispatch(addError(err));

        }
    }
}