const router = require('express').Router();

router.use('/regions', require('./regions'));
router.use('/countries', require('./countries'));
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/members', require('./members'));

module.exports = router;