const {useError} = require("../../utils/useError");
const jwt = require('jsonwebtoken');
const {getPendedDoctorById, deletePendedDoctor} = require("../../repositories/pendedDoctor.repository");
const {getDoctorById, addDoctor, updateDoctor} = require("../../repositories/doctor.repository");
const {getSpecialtyById} = require("../../repositories/specialty.repository");
const {getScientificDegreeById} = require("../../repositories/scientificDegree.repository");
const {addNewDoctor} = require("../doctor");
const Specialty = require("../../models/specialty");
const ScientificDegree = require("../../models/scientificDegree");
const {generateJwtForLoggedInUser} = require("../../utils/jwtGenerator");

module.exports = async (req, res, next) => {
  let decodedToken, finalResult;
  try {
		try {
			decodedToken = jwt.verify(req.params.token, process.env.JWT_KEY);
		} catch (err) {
			throw useError('Not authenticated', 401);
		}
		const pendedDoctor = await getPendedDoctorById(decodedToken.id);
		const exDoctor = await getDoctorById(decodedToken.id);
		const spec = await getSpecialtyById(pendedDoctor.specialtyId);
		const sciDeg = await getScientificDegreeById(pendedDoctor.scientificDegreeId);
		if (exDoctor) {
			const updatedDoctor = await updateDoctor(exDoctor, pendedDoctor.dataValues);
			await updatedDoctor.setSpecialty(spec);
			await updatedDoctor.setScientificDegree(sciDeg);
    await updatedDoctor.reload({
      attributes: { exclude: ['password'] }, include: [Specialty, ScientificDegree]
    });
			finalResult = updatedDoctor;
		} else {
			const newDoctor = await addDoctor(pendedDoctor.dataValues);
			await newDoctor.setSpecialty(spec);
			await newDoctor.setScientificDegree(sciDeg);
			await newDoctor.reload({
				attributes: { exclude: ['password'] },
				include: [Specialty, ScientificDegree]
			});
			finalResult = newDoctor;
		}
		const deletedPenDr = await deletePendedDoctor(pendedDoctor);
		const token = generateJwtForLoggedInUser({id: finalResult.id, role: 'user' })
		return res.status(200).json({message: 'Registerd successfuly', data: finalResult, token: token});
  } catch (error) {
		next(error);
  }
}
