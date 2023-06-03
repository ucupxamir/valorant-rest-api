const Router = require('express');
const MapService = require('../services/MapService');
const MapRouter = Router();

MapRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        await MapService.create(data);

        res.jsend.success({ message: 'Map has been successfully created.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

MapRouter.get('/', async (req, res) => {
    try {
        const maps = await MapService.findAll();

        res.jsend.success(maps);
    } catch (error) {
        res.jsend.error(error);
    }
});

MapRouter.get('/:id', async (req, res) => {
    try {
        const map = await MapService.findByPk(req.params.id);

        res.jsend.success(map);
    } catch (error) {
        res.jsend.error(error);
    }
});

MapRouter.post('/:id', async (req, res) => {
    try {
        const data = req.body;
        data.id = req.params.id;

        await MapService.update(data);

        res.jsend.success({ message: 'Map has been successfully updated.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

module.exports = MapRouter;