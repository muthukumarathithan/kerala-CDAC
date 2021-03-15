const db = require('../models');
const moment = require('moment');
const async = require('async');
const geolib = require('geolib');


exports.showVehicles = async(req, res, next) =>{
    try {
      const {id, user_type} = req.decoded;
      console.log(req.decoded)
      var filter = {}
      if(user_type === 2)
        filter = {distributor:id}
        else if(user_type === 3)
          filter = {dealer:id}
          else if(user_type === 4)
            filter = {customer:id} 
        
        const vehicles = await db.Vehicle.find(filter)
        .populate('customer')
        .populate('dealer')
        .populate('distributor');
        res.status(200).json(vehicles)
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.getLocationHistory = async(req, res, next) =>{
    try {
        var vehicle_list = [], location_list = [];
        console.log(req.body);
        async.parallel([
          function(callback) {
            db.Vehicle.find({device_id:req.body.GPS_Device_Id},(err, vehicles)=>{
              var offroad_time = 24 * 60;
              var offline_time = 1 * 60;
              var status = 'Online';
         
             if(vehicles.length > 0){
              vehicles.map( vehicle =>{
                var endTime = moment();
                var startTime=moment(vehicle.device_time);
                var duration = moment.duration(endTime.diff(startTime));
                var minutes = duration.asMinutes();
                if(vehicle.garage){
                  garage_vehicles++;
                  status = 'Garage'
                }
                else if(minutes > offroad_time){
                  status = 'Offroad'
                }
                else if(minutes > offline_time){
                  status = 'Offline'
                }
                else if(vehicle.ignition_status && minutes < 5){
                  status = 'Online'
                }
                else{
                  status = 'Idle'
                }
                vehicle_list.push ({
                      GPS_Device_Id:vehicle.device_id,
                      Vehicle_Reg_No:vehicle.vehicle_reg_no,
                      Vehicle_status:status,
                      fixTime:moment(vehicle.device_time).format('DD-MMM-YYYY hh:mm:ss A'),
                      Branch:vehicle.branch,
                      District_Name:vehicle.district_name,
                      Idle_duration:'00:00:00',
                      speed:vehicle.speed,
                      vehicle_image:'http://avagpstracker.com/TN108/assets/Truck/'+status+'.png',
                      lat_message:vehicle.latitude,
                      lon_message:vehicle.longitude,
                      ignition_status:vehicle.ignition_status,
                      Driver_Mobile_Number:'9942885566',
                      odometer_reading:vehicle.gps_odometer,
                      VehicleBatteryStatus:vehicle.external_bt_voltage === '0' ? false: true,
                      Fuel:0,
                      Select_Driver:'Driver 1',
                      Vibration:false,
          
                });
                console.log(vehicle_list);
              callback(null)
              });
            }
              
          });
                  
          },
          function(callback) {
            var fromDate = moment(req.body.fromdate,'YYYY-MM-DD H:mm:ss');
            var toDate = moment(req.body.todate,'YYYY-MM-DD H:mm:ss');
            var query = {gps_device_id:req.body.GPS_Device_Id, device_time:{$gte:new Date(fromDate), $lte:new Date(toDate)}};
            var sort_query = {sort:{device_time:1}};
            var filter_query = {latitude : 1, longitude:1, speed:1};
              db.Location.find(query,filter_query,sort_query, (err, location)=>{
               location_list = location;
               console.log(location);
                callback(null);
              }) 
          },
        
      ],
      // optional callback
      function(err, results) {
          res.send({
                Location_history_detail:{
                  device:vehicle_list,
                  gps_values:location_list
                }
      
              });
      });        
       
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.getVehicleReport = async(req, res, next) =>{
    try {
        var location_list = [];
  var fromDate = moment(req.body.fromdate,'YYYY-MM-DD H:mm:ss');
  var toDate = moment(req.body.todate,'YYYY-MM-DD H:mm:ss');
  console.log(req.body);
  async.parallel([
     function(callback) {
      
      var query = {device_id:req.body.GPS_Device_Id, device_time:{$gte:new Date(fromDate), $lte:new Date(toDate)}};
      var sort_query = {sort:{device_time:1}};
      var filter_query = {latitude : 1, longitude:1, speed:1, ignition_status:1, device_time:1, gps_device_id: 1};
        db.Location.find(query,filter_query,sort_query, (err, location)=>{
          var prev_status = true;
          var isStopped = false;
          var start_lat, start_lon, vehicle_idle_start, vehicle_idle_stop;
         location.map((item, index)=>{
            if(item.speed > Number(req.body.overspeedlimit)){
              location_list.push({
                lat_message:item.latitude,
                lon_message:item.longitude,
                Stoppage:"Overspeed",
                endtime:moment(item.device_time).format('DD-MMM-YYYY H:mm:ss'),
                speed:item.speed
              })
            }
            if(prev_status === true && item.ignition_status === false){
              vehicle_idle_start = item.device_time;
              start_lat = item.latitude;
              start_lon = item.longitude;
            }  
             else if(prev_status === false && item.ignition_status === true){
                vehicle_idle_stop =  item.device_time;
                isStopped = true;
             }         

            if(isStopped){

              function convertMS(ms) {
                    var d, h, m, s;
                    s = Math.floor(ms / 1000);
                    m = Math.floor(s / 60);
                    s = s % 60;
                    h = Math.floor(m / 60);
                    m = m % 60;
                    d = Math.floor(h / 24);
                    h = h % 24;
                    h += d * 24;
                    if(h < 9)
                      h = '0'+h;
                    if(m < 9)
                      m = '0'+m;
                    if(s < 9)
                      s = '0'+s;
                    return h + ':' + m + ':' + s;
                }

                var idle_time = moment(vehicle_idle_stop).valueOf() - moment(vehicle_idle_start).valueOf();
                var idle_data = {
                  gps_device_id:item.gps_device_id,
                  vehicle_idle_start:moment(vehicle_idle_start).format('DD-MMM-YYYY H:mm:ss'),
                  endtime:moment(vehicle_idle_stop).format('DD-MMM-YYYY H:mm:ss'),
                  duration : convertMS(idle_time),
                  start_lat_message:start_lat,
                  start_lon_message:start_lon,
                  end_lat_message:item.latitude,
                  end_lon_message:item.longitude,
                  Stoppage:'Stoppage',
                   };
                location_list.push(idle_data);
                isStopped = false;
  
             }  
            prev_status = item.ignition_status; 
         })
          callback(null);
        }) 
    },
  
],
// optional callback
function(err, results) {
    res.send({
          OverspeedstoppageDetail:location_list

        });
});
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.getVehicleHistory = async(req, res, next) =>{
    try {
  var date = moment(req.body.date,'YYYY-MM-DD H:mm:ss');
  var query = {device_id:req.body.GPS_Device_Id, device_time:{$lte:new Date(date)}};
  var sort_query = {sort:{device_time:-1}, limit :1};

  var offroad_time = 24 * 60;
  var offline_time = 1 * 60;
  var status = 'Online';

  db.Location.find(query, null, sort_query, (err, vehicle) =>{
      if(vehicle.length > 0){
        var endTime = moment(date);
        var startTime=moment(vehicle[0].device_time);
        var duration = moment.duration(endTime.diff(startTime));
        var minutes = duration.asMinutes();
        if(vehicle[0].garage){
          status = 'Garage'
        }
        else if(minutes > offroad_time){
          status = 'Offroad'
        }
        else if(minutes > offline_time){
          status = 'Offline'
        }
        else if(vehicle[0].ignition_status && minutes < 5){
          status = 'Online'
        }
        else{
          status = 'Idle'
        }
        res.send(
          {
              Vehiclelocation:{
              GPS_Device_Id:vehicle[0].device_id,
              Vehicle_status:status,
              fixTime:moment(vehicle[0].device_time).format('DD-MMM-YYYY hh:mm:ss A'),
              speed:vehicle[0].speed,
              vehicle_image:'http://avagpstracker.com/TN108/assets/Truck/'+status+'.png',
              lat_message:vehicle[0].latitude,
              lon_message:vehicle[0].longitude,
              ignition_status:vehicle[0].ignition_status,
              Driver_Mobile_Number:'9942885566',
              odometer_reading:vehicle[0].gps_odometer,
             }     
        });
      }
      else{
        res.send(
            {
                Vehiclelocation:{
                              }     
          });
      }


  })
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.getVehicleAlerts = async(req, res, next) =>{
    try {
        db.Vehicle.find({device_id:req.body.GPS_Device_Id},(err, vehicles)=>{
            var offroad_time = 24 * 60;
            var offline_time = 1 * 60;
            var status = 'Online';
            var vehicle_list = [], alert_details = [];
        
           if(vehicles.length > 0){
            vehicles.map( vehicle =>{
              var endTime = moment();
              var startTime=moment(vehicle.device_time);
              var duration = moment.duration(endTime.diff(startTime));
              var minutes = duration.asMinutes();
              if(vehicle.garage){
                garage_vehicles++;
                status = 'Garage'
              }
              else if(minutes > offroad_time){
                status = 'Offroad'
              }
              else if(minutes > offline_time){
                status = 'Offline'
              }
              else if(vehicle.ignition_status && minutes < 5){
                status = 'Online'
              }
              else{
                status = 'Idle'
              }
              vehicle_list.push ({
                    GPS_Device_Id:vehicle.device_id,
                    Vehicle_Reg_No:vehicle.vehicle_reg_no,
                    Vehicle_status:status,
                    fixTime:moment(vehicle.device_time).format('DD-MMM-YYYY hh:mm:ss A'),
                    Branch:"Kerala",
                    District_Name:"Kollam",
                    Idle_duration:'00:00:00',
                    speed:vehicle.speed,
                    vehicle_image:'http://avagpstracker.com/TN108/assets/Truck/'+status+'.png',
                    lat_message:vehicle.latitude,
                    lon_message:vehicle.longitude,
                    ignition_status:vehicle.ignition_status,
                    Driver_Mobile_Number:'9942885566',
                    odometer_reading:vehicle.gps_odometer,
                    VehicleBatteryStatus:vehicle.external_bt_voltage === '0' ? false: true,
                    Fuel:0,
                    Select_Driver:'Driver 1',
                    Vibration:false,
        
              });
              if(vehicle.box_status)
              alert_details.push ({
                title:"Gps Device",
                content:"Gps Box is Opened now"
              })
              if(vehicle.internal_bt_voltage === '1')
              alert_details.push ({
                title:"Internal battery",
                content:"Internal Battery Voltage Low"
              })
        
              if(vehicle.external_bt_voltage === '1')
              alert_details.push ({
                title:"External battery",
                content:"External Battery Voltage Low"
              })
                
              res.status(200).json({
                MessageDetail:vehicle_list,
                Alert_result:alert_details
              });
            
            });
          }
            
        });
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getLiveTrack = async(req, res, next) =>{
    try {
        db.Vehicle.find({device_id:req.body.GPS_Device_Id},(err, vehicles)=>{
            var offroad_time = 24 * 60;
            var offline_time = 1 * 60;
            var status = 'Online';
            var vehicle_list = [];
        
           if(vehicles.length > 0){
            vehicles.map( vehicle =>{
              var endTime = moment();
              var startTime=moment(vehicle.device_time);
              var duration = moment.duration(endTime.diff(startTime));
              var minutes = duration.asMinutes();
              if(vehicle.garage){
                garage_vehicles++;
                status = 'Garage'
              }
              else if(minutes > offroad_time){
                status = 'Offroad'
              }
              else if(minutes > offline_time){
                status = 'Offline'
              }
              else if(vehicle.ignition_status && minutes < 5){
                status = 'Online'
              }
              else{
                status = 'Idle'
              }
              vehicle_list.push ({
                    GPS_Device_Id:vehicle.device_id,
                    Vehicle_Reg_No:vehicle.vehicle_reg_no,
                    Vehicle_status:status,
                    fixTime:moment(vehicle.device_time).format('DD-MMM-YYYY hh:mm:ss A'),
                    Branch:"Kerala",
                    District_Name:"Kollam",
                    Idle_duration:'00:00:00',
                    speed:vehicle.speed,
                    vehicle_image:'http://avagpstracker.com/TN108/assets/Truck/'+status+'.png',
                    lat_message:vehicle.latitude,
                    lon_message:vehicle.longitude,
                    ignition_status:vehicle.ignition_status,
                    Driver_Mobile_Number:'9942885566',
                    odometer_reading:vehicle.gps_odometer,
                    VehicleBatteryStatus:vehicle.external_bt_voltage === '0' ? false: true,
                    Fuel:0,
                    Select_Driver:'Driver 1',
                    Vibration:false,
        
              });
              res.status(200).json({
                Livetrackdetail:vehicle_list,
              });
            
            });
          }
            
        });
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.getDistances = async(req, res, next) =>{
    try {
        async.parallel([
            function(callback) {
              var start_time = moment().startOf('day');
              var end_time = moment();
              var query = {device_id:req.body.GPS_Device_Id, device_time:{$gte:new Date(start_time), $lte:new Date(end_time)}}
              console.log('+++++++++++++++++++++')
              console.log(query)
              console.log('+++++++++++++++++++++')
              var sort_query = {sort:{device_time:-1}};
              db.Location.find(query, null, sort_query, (err, data)=>{
                var distance = 0;
                if(data.length > 0){
                  data.map((item, index) =>{
                    if(index !== 0){
                      var dist = geolib.getDistance({
                        latitude: item.latitude,
                        longitude: item.longitude,
                      },prev_coords);
                     
                      distance = distance + dist;
                     }
                     prev_coords = {
                       latitude:item.latitude,
                       longitude: item.longitude,
                     }
                  });
                }
                distance = distance/1000;
                callback(null, distance.toFixed(2))
                
              })
            },
            function(callback) {
              var start_time = moment().subtract(1,'day').startOf('day');
              var end_time = moment().subtract(1,'day').endOf('day');
              var query = {device_id:req.body.GPS_Device_Id, device_time:{$gte:new Date(start_time), $lte:new Date(end_time)}}
              var sort_query = {sort:{device_time:-1}, limit:100};
              db.Location.find(query, null, sort_query, (err, data)=>{
                var distance = 0;
                if(data.length > 0){
                  data.map((item, index) =>{
                    if(index !== 0){
                      var dist = geolib.getDistance({
                        latitude: item.latitude,
                        longitude: item.longitude,
                      },prev_coords);
                     
                      distance = distance + dist;
                     }
                     prev_coords = {
                       latitude:item.latitude,
                       longitude: item.longitude,
                     }
                  });
                }
                distance = distance/1000;
                callback(null, distance.toFixed(2))
                
              })
            },
            function(callback) {
              var distance = 0;
              //distance = distance/1000;
                callback(null, distance.toFixed(2))
            }
        
        
          ],
          function(err, results) {
           console.log(results);
           res.send({
            Status:{Code:'0',Message:'Success'}, 
            DistanceData:[{"Today":results[0],"Yesterday":results[1],"CurrentMonth":results[2],"vehicle_id":req.body.GPS_Device_Id}], 
           })
        })
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.showCustomerVehicles = async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const vehicles = await db.Vehicle.find({customer:id});
        var online_vehicles,idle_vehicles,offroad_vehicles,offline_vehicles,garage_vehicles, total_vehicles, vehicle_list = [], status = 'Online';
        online_vehicles = idle_vehicles = offroad_vehicles = offline_vehicles = garage_vehicles = total_vehicles = 0 ;
        const offroad_time = 24 * 60, offline_time = 1 * 60;
        total_vehicles = vehicles.length;
        vehicle_list  = await vehicles.map( vehicle =>{
            var endTime = moment();
            var startTime=moment(vehicle.device_time);
            var duration = moment.duration(endTime.diff(startTime));
            var minutes = duration.asMinutes();
            if(vehicle.garage){
              garage_vehicles++;
              status = 'Garage'
            }
            else if(minutes > offroad_time){
              offroad_vehicles++;
              status = 'Offroad'
            }
            else if(minutes > offline_time){
              offline_vehicles++;
              status = 'Offline'
            }
            else if(vehicle.ignition_status && minutes < 5){
              online_vehicles++;
              status = 'Online'
            }
            else{
              idle_vehicles++;
              status = 'Idle'
            }
            var fromDate = moment().startOf('day');
            var toDate = moment();
            console.log(vehicle);
            var query = {device_id:vehicle.device_id, device_time:{$gte:new Date(fromDate), $lte:new Date(toDate)}};
            var sort_query = {sort:{device_time:1}};
            var idle_duration = 0, converted_duration = '00:00:00';
            var filter_query = {latitude : 1, longitude:1, speed:1, ignition_status:1, device_time:1, gps_device_id: 1};
            var location = db.Location.find(query, filter_query, sort_query);

                var prev_status = true;
                var vehicle_idle_start, vehicle_idle_stop;
               location.map((item, index)=>{
                 if(index !== 1) 
                  if(prev_status === true && item.ignition_status === false){
                    vehicle_idle_start = item.device_time;
                    start_lat = item.latitude;
                    start_lon = item.longitude;
                  }  
                   else if(prev_status === false && item.ignition_status === true){
                      vehicle_idle_stop =  item.device_time;
                      var idle_time = moment(vehicle_idle_stop).valueOf() - moment(vehicle_idle_start).valueOf();
                      idle_duration = idle_duration + idle_time;
                      console.log(idle_duration);
                   }         
                  
                  prev_status = item.ignition_status; 
               })
              function convertMS(ms) {
                var d, h, m, s;
                s = Math.floor(ms / 1000);
                m = Math.floor(s / 60);
                s = s % 60;
                h = Math.floor(m / 60);
                m = m % 60;
                d = Math.floor(h / 24);
                h = h % 24;
                h += d * 24;
                if(h < 9)
                  h = '0'+h;
                if(m < 9)
                  m = '0'+m;
                if(s < 9)
                  s = '0'+s;
                return h + ':' + m + ':' + s;
            }
            if(idle_duration > 0){
              converted_duration = convertMS(idle_duration);
            }
           

            return {
                  GPS_Device_Id:vehicle.device_id,
                  Vehicle_Reg_No:vehicle.vehicle_reg_no,
                  Vehicle_status:status,
                  fixTime:moment(vehicle.device_time).format('DD-MMM-YYYY hh:mm:ss A'),
                  Branch:"Kerala",
                  District_Name:"Kollam",
                  Idle_duration:converted_duration,
                  speed:vehicle.speed,
                  vehicle_image:'http://avagpstracker.com/TN108/assets/Truck/'+status+'.png',
                  lat_message:vehicle.latitude,
                  lon_message:vehicle.longitude,
                  ignition_status:vehicle.ignition_status,
                  Driver_Mobile_Number:'9942885566',
                  odometer_reading:vehicle.gps_odometer,
            }
          
          });
          if(req.body.type === '1')
          vehicle_list = vehicle_list.filter(vehicle => vehicle.Vehicle_status ==='Online')
          else if(req.body.type === '2')
          vehicle_list = vehicle_list.filter(vehicle => vehicle.Vehicle_status ==='Idle') 
          else if(req.body.type === '3')
          vehicle_list = vehicle_list.filter(vehicle => vehicle.Vehicle_status ==='Offline' ||  vehicle.Vehicle_status ==='Garage') 
           else if(req.body.type === '4')
          vehicle_list = vehicle_list.filter(vehicle => vehicle.Vehicle_status ==='Offroad') 
   
   
         res.status(200).json({
               Total : total_vehicles,
               Online :online_vehicles,
               Idle :idle_vehicles,
               Offline :offline_vehicles,
               Offroad :offroad_vehicles,
               Garage : garage_vehicles,
               VehicleData:vehicle_list,
             });
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.getVehicle = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const vehicles = await db.Vehicle.findById(id)
        .populate('device');
        console.log(vehicles)
        res.status(200).json(vehicles)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.createVehicle = async(req, res, next) =>{
    try {
        const {id, user_type, user_id} = req.decoded;
        const {device_id} = req.body.device;
        const customer = await db.Customer.findById(id);
        req.body.customer = id;
        req.body.device_id = device_id;
        console.log(customer);
        const vehicle =  await db.Vehicle.create({
            ...req.body,
            device_id,
            customer,
            dealer:customer.dealer,
            distributor:customer.distributor
         });
        res.status(200).json(vehicle);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}


exports.deleteVehicle = async(req, res, next) =>{
  try {
      const {id:vehicleId} = req.params;
      const {id:userId, user_type } = req.decoded;
      const vehicle = await db.Vehicle.findById(vehicleId);
      if(user_type <= 4 )
        await vehicle.remove()
       else throw new Error('Unauthorized access'); 
      res.status(200).json(vehicle)
  } catch (error) {
      error.status = 400;
      next(error)
  }
} 