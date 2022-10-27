const ScientificDegree = require("../models/scientificDegree.model")

exports.getScientificDegreeById = async (id) => {
  return await ScientificDegree.findByPk(id);
}

exports.getAllScientificDegrees = async () => {
  return await ScientificDegree.findAll();
}

exports.isScientificDegreeTableHasRecords = async () => {
  return await (await ScientificDegree.findAndCountAll()).count > 0;
}
