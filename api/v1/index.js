const router = require('express').Router();

router.use('/regions', require('./regions'));
router.use('/countries', require('./countries'));
router.use('/players', require('./players'));

module.exports = router;