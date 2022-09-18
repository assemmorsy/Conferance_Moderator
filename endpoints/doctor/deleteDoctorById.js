const drRepo = require('../../repositories/doctorRepository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
	try {
		const doctor = await drRepo.getDoctorById(req.params.id);
		if (!doctor) {
			throw useError('Resource not found', 404);			
		}
		const delDocotr = await drRepo.deleteDoctor(doctor);
		return res.status(200).json({
			message: "Resource deleted successfuly",
			data: delDocotr
		});
	} catch (err) {
		next(err);
	}
}
