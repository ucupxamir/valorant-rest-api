'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
const models = require('./');
const Team = models.Team

module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        static associate(models) {
            this.belongsTo(models.Team, { foreignKey: 'team', targetKey: 'id' });
            this.belongsTo(models.Player, { foreignKey: 'player', targetKey: 'id' });
            this.hasMany(models.Scoreboard, { foreignKey: 'member', sourceKey: 'id' })

            this.beforeSave(async (user, option) => {
                const existingData = await this.findOne({
                    where: {
                        player: user.player,
                        status: 'active'
                    }
                })

                if (existingData)
                    throw new Error(`Player is active on another team!`)
            })


        }
    }

    Member.init({
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
            type: Sequelize.ENUM('active', 'former', 'loan'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        tableName: 'm_members',
        name: {
            plural: 'Members',
            singular: 'Member'
        }
    });
    return Member;
};