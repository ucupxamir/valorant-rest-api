'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
const Country = require('./country');

module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        static associate(models) {
            this.belongsTo(models.Country, { foreignKey: 'country', targetKey: 'id' })
            this.addScope('withCountry', {
                include: [{
                    required: false,
                    model: models.Country
                }]
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