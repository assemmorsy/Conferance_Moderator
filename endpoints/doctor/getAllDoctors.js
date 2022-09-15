const drRepo = require('../../repositories/doctorRepository');

module.exports = async (req, res, next) => {
  try {
    const doctors = await drRepo.getAllDoctors();
    return res.status(200).json({ message: "All doctors data", data: doctors });
  } catch (err) {
    next(err);
  }
}
