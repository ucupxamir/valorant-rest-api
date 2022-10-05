const router = require('express').Router();

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/members', require('./members'));
router.use('/tournaments', require('./tournaments'));
router.use('/maps', require('./maps'));
router.use('/agents', require('./agents'));
router.use('/matches', require('./matches'));

module.exports = router;