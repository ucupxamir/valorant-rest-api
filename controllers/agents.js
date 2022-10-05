const models = require('../models/');

const Agent = models.Agent;

exports.getAll = async (req, res) => {
    try {
        let data = await Agent.findAll();
        res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.create = async (req, res) => {
    try {
        let newData = {
            name: req.body.name,
            role: req.body.role
        }
        await Agent.create(newData);
        res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.update = async (req, res) => {
    try {
        let data = await Agent.update({
            name: req.body.name,
            role: req.body.role
        }, {
            where: {
                id: req.params.id
            }
        });
        data[0] == 0 ?
            res.jsend.error('Data not found!') :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
}