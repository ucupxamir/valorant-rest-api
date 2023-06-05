const { sequelize } = require('../models');
const MapRepository = require('../repositories/MapRepository');

class MapService {

    async create(data) {
        let t = await sequelize.transaction();
        try {
            const existingData = await MapRepository.findAll({
                where: data
            }, { transaction: t });

            if (existingData[0]) throw new Error('Map already exist.');

            const map = await MapRepository.create(data, { transaction: t });

            await t.commit();
            return map;
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

    async findAll() {
        try {
            const maps = await MapRepository.findAll();

            return maps;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByPk(pk) {
        try {
            const map = await MapRepository.findByPk(pk);

            if (!map) throw new Error('Map not found.');

            return map;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(data) {
        let t = await sequelize.transaction();
        try {
            const existingData = await MapRepository.findAll({
                where: {
                    name: data.name
                }
            }, { transaction: t });

            if (existingData[0] && data.id !== existingData[0].id) throw new Error('Map already exist.');

            const existingMap = await MapRepository.findByPk(data.id, { transaction: t });

            if (!existingMap) throw new Error('Map not found.');

            const map = await MapRepository.update(data, { transaction: t });

            await t.commit();
            return map;
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

}

module.exports = new MapService();