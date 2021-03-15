import {addError, removeError} from './error';
import {SET_LIVE_VEHICLES, SET_LIVE_VEHICLE, SET_VEHICLE_STATUS} from '../actionTypes';
import socketIOClient from "socket.io-client";
import moment from 'moment';
import decode from 'jwt-decode';

const socket = socketIOClient('http://localhost:4001/');

export const setLiveVehicles = (liveVehicles) => {
    return {
        type:SET_LIVE_VEHICLES,
        liveVehicles
    }
}

export const setLiveVehicle = (liveVehicle) => {
    return {
        type:SET_LIVE_VEHICLE,
        liveVehicle
    }
}

export const setVehicleStatus = (vehicleStatus) => {
    return {
        type:SET_VEHICLE_STATUS,
        vehicleStatus
    }
}

export const getVehicleStatus = (ignition_status, speed, device_time, garage) =>{
    var offroad_time = 24 * 60;
    var offline_time =  12 * 60;
    var endTime=moment();
    var startTime=moment(device_time);
    var duration = moment.duration(endTime.diff(startTime));
    var minutes = duration.asMinutes();
    if(garage)
      return 'garage';
    else if((minutes > offroad_time) || minutes < 0)
    return 'offroad';
    else if(minutes > offline_time)
    return 'offline';
    else if(ignition_status && minutes < 5)
      return 'online';
    else
    return 'idle';
  }

export const getLiveVehicles = () =>{
    return async (dispatch, getState) =>{
        try {
            if(localStorage.token){
               const user = decode(localStorage.token);
               socket.emit("get_data",user);
               setInterval(() => {
                   socket.emit("get_data",user);
               }, 200000);
            }
           
            socket.on("get_data", (vehicles)=>{
                const {liveVehicle} = getState();
                var online = [], idle = [], offline = [], offroad = [], garage = [];
                vehicles.map(item => {
                    var status = getVehicleStatus(item.ignition_status, item.speed, item.device_time, item.garage);
                    item.status = status;
                    if( status === 'online' ){
                        item.color = '#26C281';
                        online.push(item);
                    }
                    else if( status === 'idle'){
                        item.color = '#B9B9B9';
                        idle.push(item);
                    }
                    else if( status === 'offline'){
                        item.color = '#7d68ff';
                        offline.push(item);
                    }
                    else if( status === 'offroad'){
                        item.color = '#e7505a';
                        offroad.push(item);
                    }
                    else if( status === 'garage'){
                        item.color = '#E87E04';
                        garage.push(item);
                    }

                    if(liveVehicle.vehicle_reg_no === item.vehicle_reg_no){
                    dispatch(setLiveVehicle(item));

                   }
                  });
                 vehicles = [...online, ...idle, ...offline, ...offroad, ...garage];
                 var status = {
                    total:vehicles.length,
                    online:online.length,
                    idle:idle.length,
                    offline:offline.length,
                    offroad:offroad.length,
                    garage:garage.length,
                 }
                 dispatch(setLiveVehicles(vehicles));
                 dispatch(setVehicleStatus(status));
                dispatch(removeError())
            });
           
        } catch (error) {
            alert(error);
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getLiveVehicle = (vehicle_reg_no) =>{
    return async (dispatch, getState) =>{
        try {
            const {liveVehicles} = getState();
            const vehicle = liveVehicles.find(vehicle => vehicle.vehicle_reg_no === vehicle_reg_no);
            dispatch(setLiveVehicle(vehicle));
            dispatch(removeError());

        } catch (error) {
            alert(error)
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
} 