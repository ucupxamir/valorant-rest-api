const router = require('express').Router();

const map = require('../../controllers/maps');

router.get('/', map.getAll);
router.post('/', map.create);
router.patch('/:id', map.update);

module.exports = router;