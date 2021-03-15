const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showVehicles)
.post(auth, handler.createVehicle)

router.route('/user')
.post(auth, handler.getUserPolls)

      /** For Mobile Api **/ 
router.route('/get_customer_vehicles')
.post(auth, handler.showCustomerVehicles)

router.route('/get_km_summary')
.post(auth, handler.getDistances)

router.route('/live_track') 
.post(auth, handler.getLiveTrack)

router.route('/get_vehicle_alerts') 
.post(auth, handler.getVehicleAlerts)

router.route('/get_vehicle_history') 
.post(auth, handler.getVehicleHistory)

router.route('/get_vehicle_report') 
.post(auth, handler.getVehicleReport)

router.route('/get_location_history') 
.post(auth, handler.getLocationHistory)


router.route('/:id')
.get(auth, handler.getVehicle)
.post(auth, handler.vote)
.delete(auth, handler.deleteVehicle)

module.exports = router;


