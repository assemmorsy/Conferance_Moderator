const multer = require('multer');
const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const storages = require('../utils/multerStorage');
const hasRoleOf = require('../utils/hasRoleOf');
const roles = require('../statics/roles');
const { getAllUsers, getUserById, addUser, updateUser, deleteUserById, updateUserProfileImage } = require('../endpoints/user');
const {userRoutes} = require('../statics/routes');
const {addUserValidator, updateUserValidator} = require('../validators/user');
const upload = multer({ storage: storages.doctorsProfilesStorage });

router.get(userRoutes.getAll, getAllUsers);
router.get(userRoutes.getById, getUserById);

router.use(authMiddleware);
router.use(hasRoleOf([roles.user, roles.systemAdmin]));

router.post(userRoutes.post, addUserValidator, addUser);
router.put(userRoutes.put, updateUserValidator, updateUser);
router.delete(userRoutes.delete, deleteUserById);
router.put(userRoutes.putProfileImage, upload.single("userImg"), updateUserProfileImage);

module.exports = router;
