const { getUserById, deleteUser } = require('../../repositories/user.repository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw useError('Resource not found', 404);
    }
    const deletedUser = await deleteUser(user);
    return res.status(200).json({
      message: "Resource deleted successfuly",
      data: deletedUser
    });
  } catch (err) {
    next(err);
  }
}
