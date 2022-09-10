'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('m_players', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            fullname: {
                type: Sequelize.STRING
            },
            nickname: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            country: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'm_countries',
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
        await queryInterface.dropTable('m_players');
    }
};