const drRepo = require('../../repositories/doctorRepository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const doctor = await drRepo.getDoctorById(req.params.id);
    if (!doctor) {
      throw useError("Failed to find the requested source", 404);
    }
		console.log('************************')
		console.log(doctor);
    return res.status(200).json({ message: "OK", data: doctor });
  } catch (err) {
    next(err);
  }
}
