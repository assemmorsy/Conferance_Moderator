const University = require("../models/university.model");

exports.getAllUniversities = async () => {
	return await University.findAll();
};
