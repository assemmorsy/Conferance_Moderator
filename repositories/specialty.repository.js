const Specialty = require("../models/specialty");

exports.getSpecialtyById = async (id) => {
  return await Specialty.findByPk(id);
}

exports.isSpecialtyTableHasRecords = async () => {
  return await (await Specialty.findAndCountAll()).count > 0;
}
