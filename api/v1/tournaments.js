const router = require('express').Router();

const tournament = require('../../controllers/tournaments');

router.get('/', tournament.findAll);

module.exports = router;