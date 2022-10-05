const { sequelize } = require('../models/');
const models = require('../models/');

const Player = models.Player;

exports.getAll = async (req, res) => {
    try {
        let data = await Player.findAll();
        res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.getById = async (req, res) => {
    try {
        let data = await Player.findByPk(req.params.id)
        data === null ?
            res.jsend.error('Data not found!') :
            res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.create = async (req, res) => {
    try {
        await Player.create({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            country: req.body.country
        });
        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.update = async (req, res) => {
    try {
        let data = await player.update({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            country: country.id
        }, {
            where: {
                id: req.params.id
            }
        });
        data[0] === 0 ?
            res.jsend.error('Data not found!') :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.delete = async (req, res) => {
    try {
        let data = await player.destroy({
            where: {
                id: req.params.id
            }
        });
        data === 0 ?
            res.jsend.error('Data not found!') :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};