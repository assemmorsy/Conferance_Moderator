const path = require('path');
const {getDoctorById} = require("../../repositories/doctorRepository");
const {useError} = require("../../utils/useError");

module.exports = async (req, res, next) => {
	if (!["image/jpeg", "image/png", "image/webp"].includes(req.file.mimetype)) {
		throw useError("doctor profile image must be image (png , webp, jpg ,jpeg)", 400)
	}
	try {
		const exisitngDoctor = await getDoctorById(req.params.id);
		if (!exisitngDoctor) {
			throw useError('Doctor not found', 400);
		}
		imgPath = path.join();
	} catch (err) {
		next(err);
	}
}
