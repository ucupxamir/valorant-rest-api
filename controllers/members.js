const models = require('../models/');

const Member = models.Member;

exports.findAll = async (req, res) => {
    try {
        await Member.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.findByPk = async (req, res) => {
    try {
        let data = await Member.scope('withDetails').findByPk(req.params.id)
        data === null ?
            res.jsend.error('Data not found!') :
            res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.create = async (req, res) => {
    try {
        await Member.create({
            name: req.body.name
        })
        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.update = async (req, res) => {
    try {
        let data = await Member.update({
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
        let data = await Member.destroy({
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