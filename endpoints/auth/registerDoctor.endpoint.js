const {validationResult} = require("express-validator");
const {getDoctorByEmail, addDoctor, getDoctorByPhone} = require("../../repositories/doctor.repository");
const {addNewPendedDoctor, getPendedDoctorById, getPendedDoctorByEmail} = require("../../repositories/pendedDoctor.repository");
const {getScientificDegreeById} = require("../../repositories/scientificDegree.repository");
const {getSpecialtyById} = require("../../repositories/specialty.repository");
const {sendConfirmationEmail} = require("../../utils/confirmationEmailSender");
const {generateJwtForEmailConfirmation} = require("../../utils/jwtGenerator");
const {useError, useValidationError} = require("../../utils/useError");

module.exports = async (req, res, next) => {
	const data = req.body;
	try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }
		const exDoctor = await getDoctorByEmail(data.email);
		if (exDoctor && exDoctor.password) {
			throw useError('User with same email already registerd', 400);
		}
		const exPendedDr = await getPendedDoctorByEmail(data.email);
		if (exPendedDr) {
			throw useError('User already registerd and need confirmation. Please, check your email', 400);
		}

		if(exDoctor && !exDoctor.password) {
			data.id = exDoctor.id;
		}

    const doctorWithPhone = await getDoctorByPhone(data.phone);
    if (doctorWithPhone && doctorWithPhone.id != exDoctor.id) {
      throw useError('Phone number already in use', 400);
    }

		const specialty = await getSpecialtyById(data.specialty);
		if (!specialty) {
			throw useError("Specialty not found", 400);
		}

		const scientificDegree = await getScientificDegreeById(data.scientificDegree);
		if (!scientificDegree) {
			throw useError("Scientific degree not found", 400);
		}

		const pendedDoctor = await addNewPendedDoctor(data);
			const token = generateJwtForEmailConfirmation({id: pendedDoctor.id, role: 'user'});
			await sendConfirmationEmail(data.email, token);
			return res.status(200).json({
				message: 'User registerd successfuly. Please, check you email'
			});
	} catch (err) {
		next(err);
	}
}
