const { Tournament } = require('../models');

class TournamentRepository {

    async create(data) {
        const tournament = await Tournament.create(data);

        return tournament;
    }

    async findAll(params) {
        const tournaments = await Tournament.findAll(params);

        return tournaments;
    }

    async findByPk(pk) {
        const tournament = await Tournament.findByPk(pk);

        return tournament;
    }

    async update(data) {
        const tournament = await Tournament.update(data, {
            where: {
                id: data.id
            }
        });

        return tournament;
    }

}

module.exports = new TournamentRepository();