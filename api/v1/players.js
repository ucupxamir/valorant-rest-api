const router = require('express').Router();

const player = require('../../controllers/players');

router.get('/', player.getAll);
router.get('/:id', player.getById);
router.post('/', player.create);
router.patch('/:id', player.update);
router.delete('/:id', player.delete);

module.exports = router;