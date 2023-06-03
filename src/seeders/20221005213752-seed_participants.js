'use strict';

const data = require('./dump/participants.json')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (let index = 0; index < data.length; index++) {
            data[index].createdAt = new Date()
            data[index].updatedAt = new Date()
        }
        await queryInterface.bulkInsert('t_participants', data);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('t_participants', null, {});
    }
};