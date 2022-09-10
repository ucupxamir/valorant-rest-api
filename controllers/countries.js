const models = require('../models/');

const country = models.Country;

exports.findAll = async (req, res) => {
    try {
        await country.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.findByPk = async (req, res) => {
    try {
        let data = await country.findByPk(req.params.id)
        data === null ?
            res.jsend.error('Data not found!') :
            res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.create = async (req, res) => {
    try {
        await country.create({
            name: req.body.name
        })
        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.update = async (req, res) => {
    try {
        let data = await country.update({
            name: req.body.name
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

exports.destroy = async (req, res) => {
    try {
        let data = await country.destroy({
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