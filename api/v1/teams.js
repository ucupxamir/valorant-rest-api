const router = require('express').Router();

const team = require('../../controllers/teams');

router.get('/', team.getAll);
router.get('/:id', team.getById);
router.post('/', team.create);
router.patch('/:id', team.update);

module.exports = router;