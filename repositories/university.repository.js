const University = require("../models/university.model");

exports.getAllUniversities = async () => {
  return await University.findAll();
};

exports.getUniversityById = async (id) => {
  return await University.findByPk(id);
};

