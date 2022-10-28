const { validationResult } = require('express-validator');
const { getUserByEmail } = require('../../repositories/user.repository');
const { useValidationError, useError } = require('../../utils/useError');
const bcrypt = require('bcrypt');
const { generateJwtForLoggedInUser } = require('../../utils/jwtGenerator');
const roles = require('../../statics/roles');
const Specialty = require('../../models/specialty.model');
const ScientificDegree = require('../../models/scientificDegree.model');
const University = require('../../models/university.model');

module.exports = async (req, res, next) => {
  const data = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw useValidationError(errors);
    }
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw useError('Email or password incorrect', 401);
    }

    if (!await bcrypt.compare(data.password, user.password)) {
      throw useError('Email or password incorrect', 401);
    }

		await user.reload({
			attributes: { exclude: ['password'] },
			include: [Specialty, ScientificDegree, University] 
		});

    const token = generateJwtForLoggedInUser({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, role: roles.user });
    return res.status(200).json({ 'message': 'Authenticated', data: user, token: token });
  } catch (err) {
    next(err);
  }
}
