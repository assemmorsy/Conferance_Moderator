const {getAllSpecialities} = require("../../repositories/specialty.repository");

module.exports = async(req,res,next)=> {
	try {
		var specalties = await getAllSpecialities();
    return res.status(200).json({ message: 'All specialty resources', data: universities })
	} catch (err) {
		next(err);
	}
};
