import {combineReducers} from 'redux';
import error from './error';
import auth from './auth';
import {customers, currentCustomer} from './customers';
import {dealers, currentDealer} from './dealers';
import {distributors, currentDistributor} from './distributors';
import {devices, currentDevice} from './devices';
import {vehicles, currentVehicle} from './vehicles';
import {liveVehicles, vehicleStatus, liveVehicle} from './sockets';

export default combineReducers ({
    auth,
    error,
    customers,
    currentCustomer,
    dealers,
    currentDealer,
    distributors,
    currentDistributor,
    devices,
    currentDevice,
    vehicles,
    currentVehicle,
    liveVehicles,
    vehicleStatus,
    liveVehicle
})