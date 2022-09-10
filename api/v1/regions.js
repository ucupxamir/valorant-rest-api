const router = require('express').Router();

const region = require('../../controllers/regions');

router.get('/', region.findAll);
router.post('/', region.create);
router.patch('/:id', region.update);
router.delete('/:id', region.destroy);

module.exports = router;