const { useError } = require('../../utils/useError');

module.exports = async (req, res, next) => {
  try {
    const user = await drRepo.getDoctorById(req.params.id);
    if (!user) {
      throw useError('Resource not found', 404);
    }
    const delDocotr = await drRepo.deleteDoctor(user);
    return res.status(200).json({
      message: "Resource deleted successfuly",
      data: delDocotr
    });
  } catch (err) {
    next(err);
  }
}
