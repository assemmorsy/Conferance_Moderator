const { validationResult } = require('express-validator');
const { getDoctorById, getDoctorByEmail } = require('../../repositories/doctor.repository');
const { useValidationError, useError } = require('../../utils/useError');
const bcrypt = require('bcrypt');
const {generateJwtForLoggedInUser} = require('../../utils/jwtGenerator');
const roles = require('../../statics/roles');

module.exports = async (req, res, next) => {
  const data = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }
    const doctor = await getDoctorByEmail(data.email);
    if (!doctor) {
      throw useError('Email or password incorrect', 401);
    }
    if (!await bcrypt.compare(data.password, doctor.password)) {
      throw useError('Email or password incorrect', 401);
    }
    const token = generateJwtForLoggedInUser({user: {id: doctor.id, name: doctor.name, email: doctor.email, phone: doctor.phone}, role: roles.user });
    return res.status(200).json({ 'message': 'Authenticated', token: token });
  } catch (err) {
    next(err);
  }
}
