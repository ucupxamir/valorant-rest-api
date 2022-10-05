'use strict';

const data = require('./dump/tournaments.json')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (let index = 0; index < data.length; index++) {
            data[index].createdAt = new Date()
            data[index].updatedAt = new Date()
        }
        await queryInterface.bulkInsert('m_tournaments', data);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('m_tournaments', null, {});
    }
};