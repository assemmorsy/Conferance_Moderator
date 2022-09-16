const {validationResult} = require('express-validator');
const ScientificDegree = require('../../models/scientificDegree');
const Specialty = require('../../models/specialty');
const drRepo = require('../../repositories/doctorRepository');
const {getScientificDegreeById} = require('../../repositories/scientificDegreeRepository');
const {getSpecialtyById} = require('../../repositories/specialtyRepository');
const {useValidationError, useError} = require('../../utils/useError');

module.exports = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		const doctorData = req.body;
		const drSpec = req.body.specialty;
		const drSciDeg = req.body.scientificDegree;

		delete doctorData.specialty;
		delete doctorData.scientificDegree;

		if (!errors.isEmpty()) {
			throw useValidationError(errors);
		}
		if (await drRepo.getDoctorByEmail(doctorData.email)) {
			throw useError('Email already in use', 400);
		}

		if (await drRepo.getDoctorByPhone(doctorData.phone)) {
			throw useError('Phone number already in use', 400);
		}

		const specialty = await getSpecialtyById(drSpec);
		if (!specialty) {
			throw useError("Specialty not found", 400);
		}

		const scientificDegree = await getScientificDegreeById(drSciDeg);
		if (!scientificDegree) {
			throw useError("Scientific degree not found", 400);
		}

		const doctor = await drRepo.addDoctor(doctorData);
		await doctor.setSpecialty(specialty);
		await doctor.setScientificDegree(scientificDegree);
		await doctor.reload({
			attributes: { exclude: ['password'] },
			include: [Specialty, ScientificDegree]
		});

		return res.status(201).json({message: 'Resource added successfuly', data: doctor})
	} catch (err) {
		next(err);
	}
}
