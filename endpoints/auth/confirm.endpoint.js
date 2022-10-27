const { useError } = require("../../utils/useError");
const jwt = require('jsonwebtoken');
const { getDoctorById, addDoctor, updateDoctor, getUserById, updateUser, addUser } = require("../../repositories/user.repository");
const Specialty = require("../../models/specialty.model");
const ScientificDegree = require("../../models/scientificDegree.model");
const { generateJwtForLoggedInUser } = require("../../utils/jwtGenerator");
const { getPendedUserById, deletePendedUser } = require("../../repositories/pendedUser.repository");

module.exports = async (req, res, next) => {
  let decodedToken, finalResult;
  try {
    try {
      decodedToken = jwt.verify(req.params.token, process.env.JWT_KEY);
    } catch (err) {
      throw useError('Not authenticated', 401);
    }
    const pendedUser = await getPendedUserById(decodedToken.id);
    if (!pendedUser) {
      throw useError("The user you try to confirm dosen't exists", 404);
    }
    console.log(decodedToken.id)
    const exUser = await getUserById(decodedToken.id);
    if (exUser) {
      const updatedUser = await updateUser(exUser, pendedUser.dataValues);
      await updatedUser.reload({
        attributes: { exclude: ['password'] }, include: [Specialty, ScientificDegree]
      });
      finalResult = updatedUser;
    } else {
      const newUser = await addUser(pendedUser.dataValues);
      await newUser.reload({
        attributes: { exclude: ['password'] },
        include: [Specialty, ScientificDegree]
      });
      finalResult = newUser;
    }
    const deletedPenUser = await deletePendedUser(pendedUser);
    const token = generateJwtForLoggedInUser({ id: finalResult.id, role: 'user' });
    return res.status(200).json({ message: 'Registerd successfuly', data: finalResult, token: token });
  } catch (error) {
    next(error);
  }
}
