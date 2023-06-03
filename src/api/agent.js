const Router = require('express');
const AgentService = require('../services/AgentService');
const AgentRouter = Router();

AgentRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        await AgentService.create(data);

        res.jsend.success({ message: 'Agent has been successfully created.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

AgentRouter.get('/', async (req, res) => {
    try {
        const agents = await AgentService.findAll();

        res.jsend.success(agents);
    } catch (error) {
        res.jsend.error(error);
    }
});

AgentRouter.get('/:id', async (req, res) => {
    try {
        const agent = await AgentService.findByPk(req.params.id);

        res.jsend.success(agent);
    } catch (error) {
        res.jsend.error(error);
    }
});

AgentRouter.post('/:id', async (req, res) => {
    try {
        const data = req.body;
        data.id = req.params.id;

        await AgentService.update(data);

        res.jsend.success({ message: 'Agent has been successfully updated.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

module.exports = AgentRouter;