const { validationResult } = require('express-validator');
const { getDoctorById, getDoctorByEmail } = require('../../repositories/doctorRepository');
const { useValidationError, useError } = require('../../utils/useError');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utils/jwtGenerator');

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
    const token = jwtGenerator({ id: doctor.id, role: 'user' });
    return res.status(200).json({ 'message': 'Authenticated', token: token });
  } catch (err) {
    next(err);
  }
}
