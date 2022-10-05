const models = require('../models/');

const Maps = models.Map;

exports.getAll = async (req, res) => {
    try {
        let data = await Maps.findAll();
        res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.create = async (req, res) => {
    try {
        let newData = {
            name: req.body.name
        };
        await Maps.create(newData);
        res.jsend.success(res.status);
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.update = async (req, res) => {
    try {
        let data = await Maps.update({
            name: req.body.name
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