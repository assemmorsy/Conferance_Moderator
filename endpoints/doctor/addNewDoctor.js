const {validationResult} = require('express-validator');
const drRepo = require('../../repositories/doctorRepository');
const {useValidationError, useError} = require('../../utils/useError');

module.exports = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		const doctorData = req.body;
		
		if (!errors.isEmpty()) {
			throw useValidationError(errors);
		}
		if (await drRepo.getDoctorByEmail(doctorData.email)) {
			throw useError('Email already in use', 400);
		}

		if (await drRepo.getDoctorByPhone(doctorData.phone)) {
			throw useError('Phone number already in use', 400);
		}

		const doctor = drRepo.addDoctor(doctorData);
		return res.status(201).json({message: 'Resource added successfuly', data: doctor})
	} catch (err) {
		next(err);
	}
}
