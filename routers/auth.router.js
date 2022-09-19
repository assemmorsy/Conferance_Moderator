const router = require('express').Router();
const loginDoctorEndpoint = require('../endpoints/auth/loginDoctor.endpoint');
const registerDoctorEndpoint = require('../endpoints/auth/registerDoctor.endpoint');
const loginDoctorValidator = require('../validators/auth/loginDoctor.validator');


router.post('/auth/login-dr', loginDoctorValidator, loginDoctorEndpoint);
router.post('/auth/register-dr', registerDoctorEndpoint);


module.exports = router;
