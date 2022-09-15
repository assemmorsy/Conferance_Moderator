const Doctor = require('../models/doctor');

exports.addDoctor = async (doctor) => {
  return await Doctor.create(doctor);
}

exports.getDoctorById = async (id) => {
  return await Doctor.findByPk(id);
}

exports.getAllDoctors = async () => {
  return await Doctor.findAll();
}

exports.updateDoctor = async (doctor, updatedDoctor) => {
	await doctor.update(updatedDoctor);
	return await doctor.save();
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
