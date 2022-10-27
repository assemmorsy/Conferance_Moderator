const multer = require('multer');
const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const doctorValidators = require('../validators/doctor');
const storages = require('../utils/multerStorage');
const hasRoleOf = require('../utils/hasRoleOf');
const roles = require('../statics/roles');
const { addUser, updateUser, deleteUser, updateUserProfileImage, getAllUsers, getUserById } = require('../repositories/user.repository');

const upload = multer({ storage: storages.doctorsProfilesStorage });

router.use(authMiddleware);


router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);

router.use(hasRoleOf([roles.user, roles.systemAdmin]));

router.post('/user', doctorValidators.addDoctorValidator, addUser);
router.put('/user/:id', doctorValidators.updateDoctorValidator, updateUser);
router.delete('/user/:id', deleteUser);
router.put("/user/:id/profile-img", upload.single("userImg"), updateUserProfileImage);

module.exports = router;
