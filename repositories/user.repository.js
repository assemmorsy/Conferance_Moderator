const User = require('../models/user.model');
const ScientificDegree = require('../models/scientificDegree.model');
const Specialty = require('../models/specialty.model');

exports.addUser = async (user) => {
  return await User.create(user);
}

exports.getUserById = async (id) => {
  return await User.findByPk(id, { include: [Specialty, ScientificDegree] });
}

exports.getAllUsers = async () => {
  return await User.findAll({
    include: [Specialty, ScientificDegree]
  });
}

exports.updateUser = async (user, updatedUser) => {
  return await user.update(updatedUser);
}

exports.deleteUser = async (user) => {
  return await user.destroy();
}


exports.getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  });
}

exports.getUserByPhone = async (phone) => {
  return await User.findOne({
    where: {
      phone: phone
    }
  });
}

exports.addManyUsers = async (doctors) => {
  return await User.bulkCreate(doctors);
}

exports.truncateDoctorTable = async () => {
  await User.truncate();
}

exports.updateUserProfileImage = async (user, imgPath) => {
  await user.update({
    imagePath: imgPath
  });
}
