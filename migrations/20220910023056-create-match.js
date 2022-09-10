'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('t_matches', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            map: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'm_maps',
                        key: 'id'
                    }
                }
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
        await queryInterface.dropTable('t_matches');
    }
};