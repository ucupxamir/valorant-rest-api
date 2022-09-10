const router = require('express').Router();

const country = require('../../controllers/countries');

router.get('/', country.findAll);
router.get('/:id', country.findByPk);
router.post('/', country.create);
router.patch('/:id', country.update);
router.delete('/:id', country.destroy);

module.exports = router;