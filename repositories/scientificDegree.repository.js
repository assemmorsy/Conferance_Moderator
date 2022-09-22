const ScientificDegree = require("../models/scientificDegree")

exports.getScientificDegreeById = async (id) => {
	return await ScientificDegree.findByPk(id);
}

exports.isScientificDegreeTableHasRecords = async () => {
	return await (await ScientificDegree.findAndCountAll()).count > 0;
}
