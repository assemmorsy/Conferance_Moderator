const { getAllUsers } = require("../../repositories/user.repository");

module.exports = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ message: "All doctors data", data: users });
  } catch (err) {
    next(err);
  }
}
