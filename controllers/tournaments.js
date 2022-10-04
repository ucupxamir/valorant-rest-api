const { sequelize } = require('../models/');
const models = require('../models/');

const Tournament = models.Tournament;

exports.findAll = async (req, res) => {
    try {
        let data = await Tournament.findAll();
        res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}