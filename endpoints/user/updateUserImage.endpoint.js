const path = require('path');
const Specialty = require('../../models/specialty.model');
const { getDoctorById, updateDoctorProfileImage } = require("../../repositories/user.repository");
const storages = require('../../utils/multerStorage');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    if (!["image/jpeg", "image/png", "image/webp"].includes(req.file.mimetype)) {
      throw useError("Doctor profile image must be image (png , webp, jpg ,jpeg)", 400);
    }
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      throw useError("Resource not found", 404);
    }
    const imageURL = path.join(storages.doctorsProfilesStorage.relativePath, req.file.filename);
    await updateDoctorProfileImage(doctor, imageURL);
    await doctor.reload({ attributes: { exclude: ['password'] }, include: Specialty });
    return res.status(200).json({ message: "doctor image saved", data: doctor });
  } catch (err) {
    next(err)
  }
}
