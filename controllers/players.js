const { sequelize } = require('../models/');
const models = require('../models/');

const player = models.Player;
const Country = models.Country;

exports.findAll = async (req, res) => {
    try {
        await player.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.findByPk = async (req, res) => {
    try {
        let data = await player.scope('withCountry').findByPk(req.params.id)
        data === null ?
            res.jsend.error('Data not found!') :
            res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.create = async (req, res) => {
    try {
        const [country, created] = await Country.findOrCreate({
            where: {
                name: req.body.country
            }
        });

        await player.create({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            country: country.id
        });

        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.update = async (req, res) => {
    try {
        let data = {
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            country: req.body.country
        };

        const [country, created] = await Country.findOrCreate({
            where: {
                name: data.country
            }
        });

        const updatePlayer = await player.update({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            country: country.id
        }, {
            where: {
                id: req.params.id
            }
        });

        updatePlayer[0] === 0 ?
            res.jsend.error('Data not found!') :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.destroy = async (req, res) => {
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