const router = require('express').Router();

router.use('/regions', require('./regions'));
router.use('/countries', require('./countries'));

module.exports = router;