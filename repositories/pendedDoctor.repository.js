const PendedDoctor = require("../models/pendedUser.model")

exports.addNewPendedDoctor = async (doctor) => {
  return await PendedDoctor.create(doctor);
}

exports.getPendedDoctorById = async (id) => {
  return await PendedDoctor.findByPk(id);
}

exports.deletePendedDoctor = async (doctor) => {
  return await doctor.destroy();
}

exports.truncatePendedDoctorTable = async () => {
  await PendedDoctor.truncate();
}

exports.getPendedDoctorByEmail = async (email) => {
  return await PendedDoctor.findOne({
    where: {
      email: email
    }
  });
}
