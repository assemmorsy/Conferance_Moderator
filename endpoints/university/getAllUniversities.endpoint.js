const {getAllUniversities} = require("../../repositories/university.repository");

module.exports = async(req,res,next)=> {
	try {
		var universities = await getAllUniversities();
    return res.status(200).json({ message: 'All university resources', data: universities })
	} catch (err) {
		next(err);
	}
};
