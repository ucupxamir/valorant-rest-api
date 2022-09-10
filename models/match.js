'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        static associate(models) {

        }
    }
    Match.init({
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
        }
    }, {
        sequelize,
        tableName: 't_matches',
    });
    return Match;
};