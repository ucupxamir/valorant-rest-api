'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Score extends Model {
        static associate(models) {

        }
    }
    Score.init({
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
        }
    }, {
        sequelize,
        tableName: 't_scores',
    });
    return Score;
};