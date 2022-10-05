const router = require('express').Router();

const agent = require('../../controllers/agents');

router.get('/', agent.getAll);
router.post('/', agent.create);
router.patch('/:id', agent.update);

module.exports = router;