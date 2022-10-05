'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        static associate(models) {
            this.belongsTo(models.Tournament, { foreignKey: 'tournament', targetKey: 'id' });
            this.hasMany(models.Score, { foreignKey: 'match', sourceKey: 'id' });
            this.belongsTo(models.Map, { foreignKey: 'map', targetKey: 'id' });

            this.addScope('withDetails', {
                include: [{
                    required: false,
                    model: models.Map,
                    attributes: ['id', 'name']
                },
                {
                    required: false,
                    model: models.Tournament
                }, {
                    required: false,
                    model: models.Score,
                    attributes: ['id', 'score'],
                    include: [{
                        required: false,
                        model: models.Participant,
                        attributes: ['id'],
                        include: [{
                            required: true,
                            model: models.Team
                        }]
                    }, {
                        required: false,
                        model: models.Scoreboard,
                        attributes: {exclude: ['score', 'member', 'agent']},
                        include: [{
                            required: false,
                            model: models.Agent
                        }],
                        include: [{
                            required: false,
                            model: models.Member,
                            attributes: ['id'],
                            include: [{
                                required: true,
                                model: models.Player,
                                attributes: ['id', 'nickname']
                            }]
                        }]
                    }]
                }]
            })
        }
    }
    
    Match.init({
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