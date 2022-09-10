'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        static associate(models) {
            this.belongsTo(models.Region, { foreignKey: 'region', targetKey: 'id' });
            this.hasMany(models.Member, { foreignKey: 'team', sourceKey: 'id'})

            this.addScope('withDetails', {
                include: [{
                    required: false,
                    model: models.Region
                }, {
                    required: false,
                    model: models.Member,
                    include: [{
                        required: false,
                        model: models.Player,
                        include: [{
                            required: false,
                            model: models.Country
                        }]
                    }]
                }]
            })           
        }
    }
    Team.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            allowNull: false,
            type:
                Sequelize.STRING
        },
        region: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'm_regions',
                    key: 'id'
                }
            }
        }
    }, {
        sequelize,
        tableName: 'm_teams',
    });
    return Team;
};