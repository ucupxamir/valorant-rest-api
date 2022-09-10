'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('t_scoreboards', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            score: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 't_scores',
                        key: 'id'
                    }
                }
            },
            player: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'm_players',
                        key: 'id'
                    }
                }
            },
            agent: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'm_agents',
                        key: 'id'
                    }
                }
            },
            kill: {
                type: Sequelize.INTEGER
            },
            death: {
                type: Sequelize.INTEGER
            },
            assist: {
                type: Sequelize.INTEGER
            },
            acs: {
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
        await queryInterface.dropTable('t_scoreboards');
    }
};