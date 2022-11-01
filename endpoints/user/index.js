module.exports = {
  getUserById: require('./getUserById.endpoint'),
  getAllUsers: require('./getAllUsers.endpoint'),
  deleteUserById: require('./deleteUserById'),
  addUser: require('./addUser.endpoint'),
  updateUser: require('./updateUser.endpoint'),
  updateUserProfileImage: require('./updateUserImage.endpoint'),
	markUserAsDead: require('./markUserAsDead.endpoint')
}
