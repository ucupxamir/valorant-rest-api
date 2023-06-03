const { Agent } = require('../models');

class AgentRepository {

    async create(data) {
        const agent = await Agent.create(data);

        return agent;
    }

    async findAll(params) {
        const agents = await Agent.findAll(params);

        return agents;
    }

    async findByPk(pk) {
        const agent = await Agent.findByPk(pk);

        return agent;
    }

    async update(data) {
        const agent = await Agent.update(data, {
            where: {
                id: data.id
            }
        });

        return agent;
    }

}

module.exports = new AgentRepository();