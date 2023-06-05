const { sequelize } = require('../models');
const TournamentRepository = require('../repositories/TournamentRepository');

class TournamentService {

    async create(data) {
        try {
            const tournament = await TournamentRepository.create(data, { transaction: t });

            return tournament;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findAll() {
        try {
            const tournaments = await TournamentRepository.findAll();

            return tournaments;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByPk(pk) {
        try {
            const tournament = await TournamentRepository.findByPk(pk);

            if (!tournament) throw new Error('Tournament not found.');

            return tournament;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(data) {
        try {
            const existingTournament = await TournamentRepository.findByPk(data.id, { transaction: t });

            if (!existingTournament) throw new Error('Tournament not found.');

            const tournament = await TournamentRepository.update(data, { transaction: t });

            await t.commit();
            return tournament;
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

}

module.exports = new TournamentService();