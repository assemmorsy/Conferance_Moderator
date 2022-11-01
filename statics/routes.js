const USER_ROOT = '/user';
const AUTH_ROOT = '/auth';

exports.userRoutes = {
	getAll: USER_ROOT,
	getById: `${USER_ROOT}/:id`,
	post: USER_ROOT,
	put: `${USER_ROOT}/:id`, 
	delete: `${USER_ROOT}/:id`, 
	putProfileImage: `${USER_ROOT}/:id/profile-img`, 
	markAsDead: `${USER_ROOT}/mark-as-dead/:id`, 
}

exports.authRoutes = {
	userLogin: `${AUTH_ROOT}/login-user`,
	userRegister: `${AUTH_ROOT}/register-user`,
	userEmailConfirmation: `${AUTH_ROOT}/confirm/:token`
}
