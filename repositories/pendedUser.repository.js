const PendedUser = require("../models/pendedUser.model")

exports.addNewPendedUser = async (doctor) => {
  return await PendedUser.create(doctor);
}

exports.getPendedUserById = async (id) => {
  return await PendedUser.findByPk(id);
}

exports.deletePendedUser = async (doctor) => {
  return await doctor.destroy();
}

exports.truncatePendedUserTable = async () => {
  await PendedUser.truncate();
}

exports.getPendedUserByEmail = async (email) => {
  return await PendedUser.findOne({
    where: {
      email: email
    }
  });
}
