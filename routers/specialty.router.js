const router = require('express').Router();
const {getAllSpecialities} = require('../endpoints/specialty');

router.get('/specialty', getAllSpecialities);

module.exports = router;
