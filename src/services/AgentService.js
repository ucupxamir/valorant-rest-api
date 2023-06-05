const { sequelize } = require('../models');
const AgentRepository = require('../repositories/AgentRepository');

class AgentService {

    async create(data) {
        let t = await sequelize.transaction();
        try {
            const existingData = await AgentRepository.findAll({
                where: data
            }, { transaction: t });

            if (existingData[0]) throw new Error('Agent already exist.');

            const agent = await AgentRepository.create(data, { transaction: t });

            await t.commit();
            return agent;
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

    async findAll() {
        try {
            const agents = await AgentRepository.findAll();

            return agents;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByPk(pk) {
        try {
            const agent = await AgentRepository.findByPk(pk);

            if (!agent) throw new Error('Agent not found.');

            return agent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(data) {
        let t = await sequelize.transaction();
        try {
            const existingData = await AgentRepository.findAll({
                where: {
                    name: data.name,
                    role: data.role
                }
            }, { transaction: t });

            if (existingData[0] && data.id !== existingData[0].id) throw new Error('Agent already exist.');

            const existingAgent = await AgentRepository.findByPk(data.id, { transaction: t });

            if (!existingAgent) throw new Error('Agent not found.');

            const agent = await AgentRepository.update(data, { transaction: t });

            await t.commit();
            return agent;
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

}

module.exports = new AgentService();