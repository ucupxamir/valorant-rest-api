'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Participant extends Model {
        static associate(models) {

        }
    }
    Participant.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        tournament: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'm_tournaments',
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
        }
    }, {
        sequelize,
        tableName: 't_participants',
    });
    return Participant;
};