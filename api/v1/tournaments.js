const router = require('express').Router();

const tournament = require('../../controllers/tournaments');

router.get('/', tournament.getAll);
router.get('/:id', tournament.getById);
router.post('/', tournament.create);

module.exports = router;