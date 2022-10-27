const Doctor = require('../models/user.model');
const ScientificDegree = require('../models/scientificDegree.model');
const Specialty = require('../models/specialty.model');

exports.addDoctor = async (doctor) => {
  return await Doctor.create(doctor);
}

exports.getDoctorById = async (id) => {
  return await Doctor.findByPk(id, { include: [Specialty, ScientificDegree] });
}

exports.getAllDoctors = async () => {
  return await Doctor.findAll({
    include: [Specialty, ScientificDegree]
  });
}

exports.updateDoctor = async (doctor, updatedDoctor) => {
  return await doctor.update(updatedDoctor);
}

exports.deleteDoctor = async (doctor) => {
  return await doctor.destroy();
}


exports.getDoctorByEmail = async (email) => {
  return await Doctor.findOne({
    where: {
      email: email
    }
  });
}

exports.getDoctorByPhone = async (phone) => {
  return await Doctor.findOne({
    where: {
      phone: phone
    }
  });
}

exports.addManyDoctors = async (doctors) => {
  return await Doctor.bulkCreate(doctors);
}

exports.truncateDoctorTable = async () => {
  await Doctor.truncate();
}

exports.updateDoctorProfileImage = async (doctor, imgPath) => {
  await doctor.update({
    imagePath: imgPath
  });
}
