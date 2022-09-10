'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scoreboard extends Model {
        static associate(models) {

        }
    }
    Scoreboard.init({
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
        }
    }, {
        sequelize,
        tableName: 't_scoreboards',
    });
    return Scoreboard;
};