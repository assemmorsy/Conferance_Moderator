const {getAllScientificDegrees} = require('../endpoints/scientificDegree');

const router = require('express').Router();

router.get('/scientificDegree', getAllScientificDegrees);

module.exports = router;
