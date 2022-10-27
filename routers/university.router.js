const {getAllUniversities} = require('../endpoints/university');

const router = require('express').Router();

router.get('/university', getAllUniversities);

module.exports = router;
