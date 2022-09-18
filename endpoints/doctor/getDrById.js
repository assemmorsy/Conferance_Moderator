const drRepo = require('../../repositories/doctorRepository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const doctor = await drRepo.getDoctorById(req.params.id);
    if (!doctor) {
      throw useError("Resource not found", 404);
    }
    return res.status(200).json({ message: "OK", data: doctor });
  } catch (err) {
    next(err);
  }
}
