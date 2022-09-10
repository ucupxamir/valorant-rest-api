'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        static associate(models) {
            this.hasMany(models.Player, { foreignKey: 'country', sourceKey: 'id' })
        }
    }
    Country.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        tableName: 'm_countries',
    });
    return Country;
};