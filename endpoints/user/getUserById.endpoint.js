const { getUserById } = require('../../repositories/user.repository');
const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw useError("Resource not found", 404);
    }
    return res.status(200).json({ message: "OK", data: user });
  } catch (err) {
    next(err);
  }
}
