const router = require('express').Router();

router.use('/regions', require('./regions'));

module.exports = router;