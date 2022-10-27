const {getAllScientificDegrees} = require(".");

module.exports = async(req,res,next)=> {
	try {
		var scientificDegrees = await getAllScientificDegrees();
    return res.status(200).json({ message: 'All university resources', data: scientificDegrees })
	} catch (err) {
		next(err);
	}
};
