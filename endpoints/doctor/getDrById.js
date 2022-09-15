const drRepo = require('../../repositories/doctorRepository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const doctor = await drRepo.getDoctorById(req.params.id);
    console.log(doctor);
    if (!doctor) {
      throw useError("Failed to find the requested source", 404);
    }
    return res.status(200).json({ message: "OK", data: doctor });
  } catch (err) {
    next(err);
  }
}