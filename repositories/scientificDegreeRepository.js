const ScientificDegree = require("../models/scientificDegree")

exports.getScientificDegreeById = async (id) => {
	return await ScientificDegree.findByPk(id);
}
