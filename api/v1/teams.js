const router = require('express').Router();

const team = require('../../controllers/teams');

router.get('/', team.findAll);
router.get('/:id', team.findByPk);
router.post('/', team.create);
router.patch('/:id', team.update);

module.exports = router;