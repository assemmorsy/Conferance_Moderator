const { Model } = require("sequelize");
const { getUserById, updateUser } = require("../../repositories/user.repository");
const { useError } = require("../../utils/useError");

module.exports = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await getUserById(userId);
    if (!user) {
      throw useError('Resource not found', 404);
    }
    user.isDead = true;
    await user.save();
    return res.status(200).json({
      message: 'Resource updated successfuly',
      data: user
    });
  } catch (err) {
    next(err);
  }
}
