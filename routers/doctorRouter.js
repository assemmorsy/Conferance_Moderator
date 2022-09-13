const router = require('express').Router();
const doctorEndpoints =  require('../endpoints/doctor');
const doctorValidators = require('../validators/doctor');

router.get('/dr', doctorEndpoints.getAllDoctors)
router.get('/dr/:id', doctorEndpoints.getDrById);
router.post('/dr', doctorValidators.addDoctorValidator, doctorEndpoints.addNewDoctor);
router.put('/dr', doctorValidators.updateDoctorValidator, doctorEndpoints.updateDoctor);
router.delete('/dr/:id', doctorEndpoints.deleteDoctorById);

module.exports = router;