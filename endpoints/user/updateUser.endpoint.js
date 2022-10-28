const { validationResult } = require("express-validator");
const ScientificDegree = require("../../models/scientificDegree.model");
const Specialty = require("../../models/specialty.model");
const { getDoctorById, getDoctorByEmail, getDoctorByPhone, updateDoctor } = require("../../repositories/user.repository");
const { getScientificDegreeById } = require("../../repositories/scientificDegree.repository");
const { getSpecialtyById } = require("../../repositories/specialty.repository");
const roles = require("../../statics/roles");
const { useValidationError, useError } = require("../../utils/useError");

module.exports = async (req, res, next) => {
  try {
    if (req.body.tokenUserRole === roles.user) {
      if (req.body.tokenUserId !== req.body.id) {
        throw useError('Not authorized ', 403);
      }
    }
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }
    const userData = req.body;
    const exUser = await getDoctorById(userId);
    if (!exUser) {
      throw useError('Resource not found', 404);
    }

    const userWithEmail = await getDoctorByEmail(userData.email);
    if (userWithEmail && userWithEmail.id != userId) {
      throw useError('Email already in use', 400);
    }

    const userWithPhone = await getDoctorByPhone(userData.phone);
    if (userWithPhone && userWithPhone.id != userId) {
      throw useError('Phone number already in use', 400);
    }

    const spec = await getSpecialtyById(userData.specialty);
    if (!spec) {
      throw useError('Specialty not found', 400);
    }

    const sciDeg = await getScientificDegreeById(userData.scientificDegree);
    if (!sciDeg) {
      throw useError('Scientific degree not found', 400);
    }
    delete userData.specialty;
    delete userData.scientificDegree;
    const updatedDoctor = await updateDoctor(exUser, userData);
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
