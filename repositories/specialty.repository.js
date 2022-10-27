const Specialty = require("../models/specialty.model");

exports.getSpecialtyById = async (id) => {
  return await Specialty.findByPk(id);
}

exports.getAllSpecialities= async()=> {
	return await Specialty.findAll();
};

exports.isSpecialtyTableHasRecords = async () => {
  return await (await Specialty.findAndCountAll()).count > 0;
}
