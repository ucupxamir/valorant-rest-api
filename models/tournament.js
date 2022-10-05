'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tournament extends Model {
        static associate(models) {
            this.hasMany(models.Participant, { foreignKey: 'tournament', sourceKey: 'id'});

            this.addScope('withDetails', {
                include: [{
                    required: false,
                    model: models.Participant,
                    attributes: ['id'],
                    include: [{
                        required: true,
                        model: models.Team
                    }]
                }]
            })
        }
    }
    Tournament.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        start: {
            allowNull: false,
            type: Sequelize.DATE
        },
        end: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        tableName: 'm_tournaments',
    });
    return Tournament;
};