const Specialty = require("../models/specialty");

exports.getSpecialtyById = async (id) => {
	return await Specialty.findByPk(id);	
}
