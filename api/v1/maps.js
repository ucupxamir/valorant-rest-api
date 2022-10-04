const router = require('express').Router();

const map = require('../../controllers/maps');

router.get('/', map.findAll);
router.post('/', map.create);
router.patch('/:id', map.update);
router.delete('/:id', map.delete);

module.exports = router;