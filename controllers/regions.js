const models = require('../models/');

const region = models.Region;

exports.findAll = async (req, res) => {
    try {
        await region.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.create = async (req, res) => {
    try {
        await region.create({
            name: req.body.name
        })
        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.update = async (req, res) => {
    try {
        let data = await region.update({
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
        let data = await region.destroy({
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