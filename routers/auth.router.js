const router = require('express').Router();
const confirmEndpoint = require('../endpoints/auth/confirm.endpoint');
const loginUserEndpoint = require('../endpoints/auth/loginUser.endpoint');
const registerUserEndpoint = require('../endpoints/auth/registerUser.endpoint');
const { authRoutes } = require('../statics/routes');
const loginUserValidator = require('../validators/auth/loginUser.validator');
const registerUserValidator = require('../validators/auth/registerUser.validator');

router.post(authRoutes.userLogin, loginUserValidator, loginUserEndpoint);
router.post(authRoutes.userRegister, registerUserValidator, registerUserEndpoint);
router.get(authRoutes.userEmailConfirmation, confirmEndpoint);

module.exports = router;
