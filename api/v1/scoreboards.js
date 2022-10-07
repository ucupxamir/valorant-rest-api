const router = require('express').Router();

const scoreboard = require('../../controllers/scoreboards');

router.patch('/:id', scoreboard.update);

module.exports = router;