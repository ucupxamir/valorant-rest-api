'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        static associate(models) {
            this.hasMany(models.Member, { foreignKey: 'player', sourceKey: 'id' });

            this.beforeSave(async (user, option) => {
                const existingData = await this.findOne({
                    where: {
                        fullname: user.fullname,
                        nickname: user.nickname,
                        country: user.country
                    }
                })

                if (existingData)
                    throw new Error(`Player already exist!`)
            })
        }
    }

    Player.init({
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
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'm_countries',
                    key: 'id'
                }
            }
        }
    }, {
        sequelize,
        tableName: 'm_players',
    });
    return Player;
};