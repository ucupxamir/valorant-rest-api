'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Agent extends Model {
        static associate(models) {
            this.hasMany(models.Scoreboard, { foreignKey: 'agent', sourceKey: 'id' });
        }
    }
    Agent.init({
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
        role: {
            allowNull: false,
            type: Sequelize.ENUM('Initiator', 'Controller', 'Sentinel', 'Duelist')
        }
    }, {
        sequelize,
        tableName: 'm_agents',
    });
    return Agent;
};