const router = require('express').Router();
const doctorEndpoints = require('../endpoints/doctor');
const authMiddleware = require('../middlewares/auth.middleware');

const doctorValidators = require('../validators/doctor');

router.use(authMiddleware);

router.get('/dr', doctorEndpoints.getAllDoctors);
router.get('/dr/:id', doctorEndpoints.getDrById);
router.post('/dr', doctorValidators.addDoctorValidator, doctorEndpoints.addNewDoctor);
router.put('/dr/:id', doctorValidators.updateDoctorValidator, doctorEndpoints.updateDoctor);
router.delete('/dr/:id', doctorEndpoints.deleteDoctorById);

module.exports = router;
