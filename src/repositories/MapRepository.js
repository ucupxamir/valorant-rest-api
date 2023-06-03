const { Map } = require('../models');

class MapRepository {

    async create(data) {
        const map = await Map.create(data);

        return map;
    }

    async findAll(params) {
        const maps = await Map.findAll(params);

        return maps;
    }

    async findByPk(pk) {
        const map = await Map.findByPk(pk);

        return map;
    }

    async update(data) {
        const map = await Map.update(data, {
            where: {
                id: data.id
            }
        });

        return map;
    }

}

module.exports = new MapRepository();