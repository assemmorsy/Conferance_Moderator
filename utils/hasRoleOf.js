const { useError } = require("./useError");

module.exports = (roles) => {
  return (req, res, next) => {
    console.log(req, res, next, roles);
    try {
      if (!roles.includes(req.body.tokenUserRole)) {
        throw useError('Not authorized ', 403);
      }
    } catch (error) {
      next(error);
    }
  }
};