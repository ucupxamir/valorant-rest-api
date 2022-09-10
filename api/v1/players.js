const router = require('express').Router();

const player = require('../../controllers/players');

router.get('/', player.findAll);
router.get('/:id', player.findByPk);
router.post('/', player.create);
router.patch('/:id', player.update);
router.delete('/:id', player.destroy);

module.exports = router;