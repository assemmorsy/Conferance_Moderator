const router = require('express').Router();
const confirmEndpoint = require('../endpoints/auth/confirm.endpoint');
const loginDoctorEndpoint = require('../endpoints/auth/loginDoctor.endpoint');
const registerDoctorEndpoint = require('../endpoints/auth/registerDoctor.endpoint');
const loginDoctorValidator = require('../validators/auth/loginDoctor.validator');
const registerDoctorValidator = require('../validators/auth/registerDoctor.validator');


router.post('/auth/login-dr', loginDoctorValidator, loginDoctorEndpoint);
router.post('/auth/register-dr', registerDoctorValidator, registerDoctorEndpoint);
router.get('/auth/confirm/:token', confirmEndpoint);

module.exports = router;
