'use strict';

const data = require('./dump/teams.json')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (let index = 0; index < data.length; index++) {
            data[index].createdAt = new Date()
            data[index].updatedAt = new Date()
        }
        await queryInterface.bulkInsert('m_teams', data);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('m_teams', null, {});
    }
};