const multer = require('multer');
const router = require('express').Router();
const { updateDoctorImage, deleteDoctorById, updateDoctor, addNewDoctor, getDrById, getAllDoctors } = require('../endpoints/doctor');
const authMiddleware = require('../middlewares/auth.middleware');
const doctorValidators = require('../validators/doctor');
const storages = require('../utils/multerStorage');
const hasRoleOf = require('../utils/hasRoleOf');
const roles = require('../statics/roles');

const upload = multer({ storage: storages.doctorsProfilesStorage });

router.use(authMiddleware);


router.get('/dr', getAllDoctors);
router.get('/dr/:id', getDrById);

router.use(hasRoleOf([roles.user, roles.systemAdmin]));

router.post('/dr', doctorValidators.addDoctorValidator, addNewDoctor);
router.put('/dr/:id', doctorValidators.updateDoctorValidator, updateDoctor);
router.delete('/dr/:id', deleteDoctorById);
router.put("/dr/:id/profile-img", upload.single("drImg"), updateDoctorImage);

module.exports = router;
