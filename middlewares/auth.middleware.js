const jwt = require('jsonwebtoken');
const {useError} = require('../utils/useError');

module.exports = (req, res, next) => {
  let token, decodedToken;
  try {
    token = req.get('Authorization').split(' ')[1];
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
		throw useError('Not authenticated', 401);
  }
  try {
    req.body.tokenUserRole = decodedToken.role;
    req.body.tokenUserId = decodedToken.id;
  } catch (err) {  }
  next();
}
