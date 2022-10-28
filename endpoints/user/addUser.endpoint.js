const { validationResult } = require('express-validator');
const ScientificDegree = require('../../models/scientificDegree.model');
const Specialty = require('../../models/specialty.model');
const { getScientificDegreeById } = require('../../repositories/scientificDegree.repository');
const { getSpecialtyById } = require('../../repositories/specialty.repository');
const { getUserByEmail, getUserByPhone, addUser } = require('../../repositories/user.repository');
const { useValidationError, useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }

    const userData = req.body;
    // const UserSpecialty = req.body.specialty;
    // const userSciDeg = req.body.scientificDegree;
    // delete userData.specialty;
    // delete userData.scientificDegree;

    if (await getUserByEmail(userData.email)) {
      throw useError('Email already in use', 400);
    }

    if (await getUserByPhone(userData.phone)) {
      throw useError('Phone number already in use', 400);
    }

    // const specialty = await getSpecialtyById(UserSpecialty);
    // if (!specialty) {
    //   throw useError("Specialty not found", 400);
    // }

    // const scientificDegree = await getScientificDegreeById(userSciDeg);
    // if (!scientificDegree) {
    //   throw useError("Scientific degree not found", 400);
    // }

    const user = await addUser(userData);
    // await user.setSpecialty(specialty);
    // await user.setScientificDegree(scientificDegree);
    await user.reload({
      attributes: { exclude: ['password'] },
      include: [Specialty, ScientificDegree]
    });
    return res.status(201).json({ message: 'Resource added successfuly', data: user })
  } catch (err) {
    next(err);
  }
}
