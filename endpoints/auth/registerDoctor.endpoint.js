const { validationResult } = require("express-validator");
const { getDoctorByEmail, addDoctor, getDoctorByPhone, getUserByEmail, getUserByPhone } = require("../../repositories/user.repository");
const { addNewPendedDoctor, getPendedDoctorById, getPendedDoctorByEmail, getPendedUserByEmail, addNewPendedUser } = require("../../repositories/pendedUser.repository");
const { getScientificDegreeById } = require("../../repositories/scientificDegree.repository");
const { getSpecialtyById } = require("../../repositories/specialty.repository");
const { sendConfirmationEmail } = require("../../utils/confirmationEmailSender");
const { generateJwtForEmailConfirmation } = require("../../utils/jwtGenerator");
const { useError, useValidationError } = require("../../utils/useError");

module.exports = async (req, res, next) => {
  const data = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }

    const exPendedUser = await getPendedUserByEmail(data.email);
    if (exPendedUser) {
      throw useError('User already registerd and need email confirmation. Please, check your email', 400);
    }

    const existingUserWithEmail = await getUserByEmail(data.email);
    if (existingUserWithEmail) {
      throw useError('User with same email already registerd', 400);
    }
    const existingUserWithPhone = await getUserByPhone(data.phone);
    if (existingUserWithPhone) {
      throw useError('User with same phone already registerd', 400);
    }

    const pendedUser = await addNewPendedUser(data);
    const token = generateJwtForEmailConfirmation({ id: pendedUser.id, role: 'user' });
    await sendConfirmationEmail(data.email, token);
    return res.status(200).json({
      message: 'User registerd successfuly. Please, check you email'
    });
  } catch (err) {
    next(err);
  }
}
