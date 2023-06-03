'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('t_scores', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            match: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 't_matches',
                        key: 'id'
                    }
                }
            },
            participant: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 't_participants',
                        key: 'id'
                    }
                }
            },
            score: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('t_scores');
    }
};