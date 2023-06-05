const Router = require('express');
const TournamentService = require('../services/TournamentService');
const TournamentRouter = Router();

TournamentRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        await TournamentService.create(data);

        res.jsend.success({ message: 'Tournament has been successfully created.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

TournamentRouter.get('/', async (req, res) => {
    try {
        const tournaments = await TournamentService.findAll();

        res.jsend.success(tournaments);
    } catch (error) {
        res.jsend.error(error);
    }
});

TournamentRouter.get('/:id', async (req, res) => {
    try {
        const tournament = await TournamentService.findByPk(req.params.id);

        res.jsend.success(tournament);
    } catch (error) {
        res.jsend.error(error);
    }
});

TournamentRouter.post('/:id', async (req, res) => {
    try {
        const data = req.body;
        data.id = req.params.id;

        await TournamentService.update(data);

        res.jsend.success({ message: 'Tournament has been successfully updated.'});
    } catch (error) {
        res.jsend.error(error);
    }
});

module.exports = TournamentRouter;