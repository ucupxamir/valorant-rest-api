const { sequelize } = require('../models/');
const models = require('../models/');

const Scoreboard = models.Scoreboard;
const Agent = models.Agent;

exports.update = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        let getAgent = await Agent.findOne({
            where: {
                name: req.body.agent
            }
        }, { transaction });

        await Scoreboard.update({
            agent: getAgent.id,
            kill: req.body.kill,
            death: req.body.death,
            assist: req.body.assist,
            acs: req.body.acs
        }, {
            where: {
                id: req.params.id
            }
        }, { transaction });

        res.jsend.success(res.status);
        await transaction.commit();
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
}