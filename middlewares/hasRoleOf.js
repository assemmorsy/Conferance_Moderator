const { useError } = require("../utils/useError");

module.exports = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.body.tokenUserRole)) {
        throw useError('Not authorized ', 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
};