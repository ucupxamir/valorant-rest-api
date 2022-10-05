const router = require('express').Router();

const match = require('../../controllers/matches');

router.get('/', match.getAll);
router.get('/:id', match.getById);
router.post('/', match.create);

module.exports = router;