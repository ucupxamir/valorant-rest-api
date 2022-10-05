'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        static associate(models) {
            this.hasMany(models.Member, { foreignKey: 'team', sourceKey: 'id' });

            this.beforeSave(async (user, options) => {
                const existingData = await this.findOne({
                    where: {
                        name: user.name,
                        region: user.region
                    }
                })

                if (existingData)
                    throw new Error(`Team already exist!`)
            })

            this.addScope('withMembers', {
                include: [{
                    required: true,
                    model: models.Member,
                    attributes: { exclude: ['team', 'player'] },
                    include: [{
                        required: false,
                        model: models.Player
                    }]
                }]
            });
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
        },
        status: {
            allowNull: false,
            type: Sequelize.ENUM('active', 'deactive'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        tableName: 'm_teams',
    });
    return Team;
};