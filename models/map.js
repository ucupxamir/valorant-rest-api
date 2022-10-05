'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Map extends Model {
        static associate(models) {
            this.hasMany(models.Match, { foreignKey: 'map', sourceKey: 'id' });
        }
    }
    Map.init({
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
        tableName: 'm_maps',
    });
    return Map;
};