const router = require('express').Router();
const drEp =  require('../endpoints/doctor');

router.get('/dr/:id', drEp.getDrById);

module.exports = router;