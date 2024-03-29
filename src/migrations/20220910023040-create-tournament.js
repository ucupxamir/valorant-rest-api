'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('m_tournaments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            location: {
                type: Sequelize.STRING
            },
            start: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            end: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('m_tournaments');
    }
};