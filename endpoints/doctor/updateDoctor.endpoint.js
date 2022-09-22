const { validationResult } = require("express-validator");
const ScientificDegree = require("../../models/scientificDegree");
const Specialty = require("../../models/specialty");
const { getDoctorById, getDoctorByEmail, getDoctorByPhone, updateDoctor } = require("../../repositories/doctor.repository");
const { getScientificDegreeById } = require("../../repositories/scientificDegree.repository");
const { getSpecialtyById } = require("../../repositories/specialty.repository");
const { useValidationError, useError } = require("../../utils/useError");

module.exports = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }
    const doctorData = req.body;
    const exDoctor = await getDoctorById(doctorId);
    if (!exDoctor) {
      throw useError('Resource not found', 404);
    }

    const doctorWithEmail = await getDoctorByEmail(doctorData.email);
    if (doctorWithEmail && doctorWithEmail.id != doctorId) {
      throw useError('Email already in use', 400);
    }

    const doctorWithPhone = await getDoctorByPhone(doctorData.phone);
    if (doctorWithPhone && doctorWithPhone.id != doctorId) {
      throw useError('Phone number already in use', 400);
    }

    const spec = await getSpecialtyById(doctorData.specialty);
    if (!spec) {
      throw useError('Specialty not found', 400);
    }

    const sciDeg = await getScientificDegreeById(doctorData.scientificDegree);
    if (!sciDeg) {
      throw useError('Scientific degree not found', 400);
    }
    delete doctorData.specialty;
    delete doctorData.scientificDegree;
    const updatedDoctor = await updateDoctor(exDoctor, doctorData);
    await updatedDoctor.setSpecialty(spec);
    await updatedDoctor.setScientificDegree(sciDeg);
    await updatedDoctor.reload({
      attributes: { exclude: ['password'] }, include: [Specialty, ScientificDegree]
    });
    return res.status(200).json({
      message: 'Resource updated successfuly',
      data: updatedDoctor
    });

  } catch (err) {
    next(err);
  }
}
