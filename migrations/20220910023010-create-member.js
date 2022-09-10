'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('m_members', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
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
            team: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'm_teams',
                        key: 'id'
                    }
                }
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('active', 'former', 'loan'),
                defaultValue: 'active'
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
        await queryInterface.dropTable('m_members');
    }
};