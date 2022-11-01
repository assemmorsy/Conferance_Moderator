const { validationResult } = require("express-validator");
const ScientificDegree = require("../../models/scientificDegree.model");
const Specialty = require("../../models/specialty.model");
const { getDoctorById, getDoctorByEmail, getDoctorByPhone, updateDoctor, getUserById, getUserByEmail, getUserByPhone, updateUser } = require("../../repositories/user.repository");
const { getScientificDegreeById } = require("../../repositories/scientificDegree.repository");
const { getSpecialtyById } = require("../../repositories/specialty.repository");
const roles = require("../../statics/roles");
const { useValidationError, useError } = require("../../utils/useError");
const University = require("../../models/university.model");
const { getUniversityById } = require("../../repositories/university.repository");
const filterKeys = require("../../helpers/filterKeys");

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
    const exUser = await getUserById(userId);
    if (!exUser) {
      throw useError('Resource not found', 404);
    }

    const userWithEmail = await getUserByEmail(userData.email);
    if (userWithEmail && userWithEmail.id != userId) {
      throw useError('Email already in use', 400);
    }

    const userWithPhone = await getUserByPhone(userData.phone);
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

    const university = await getUniversityById(userData.universityId);
    if (!university) {
      throw useError('University not found', 400);
    }

    const filterd = filterKeys(['specialty', 'scientificDegree', 'university']);

    const updatedUser = await updateUser(exUser, filterd);
    await updatedUser.setSpecialty(spec);
    await updatedUser.setScientificDegree(sciDeg);
    await updatedUser.setUniversity(university);

    await updatedUser.reload({
      attributes: { exclude: ['password'] }, include: [Specialty, ScientificDegree, University]
    });
    return res.status(200).json({
      message: 'Resource updated successfuly',
      data: updatedUser
    });
  } catch (err) {
    next(err);
  }
}
