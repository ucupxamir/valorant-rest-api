const { sequelize } = require('../models/');
const models = require('../models/');
const team = require('../models/team');

const Member = models.Member;
const Player = models.Player;
const Team = models.Team;

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
    let transaction;
    try {
        transaction = await sequelize.transaction();

        let getPlayer = await Player.findOne({
            where: {
                nickname: req.body.player
            }
        }, { transaction });

        let getTeam = await Team.findOne({
            where: {
                name: req.body.team
            }
        }, { transaction })

        if (getPlayer === 0 || getTeam === 0) {
            res.jsend.error(`Player or Team not found!`)
        }

        await Member.create({
            player: getPlayer.id,
            team: getTeam.id
        }, { transaction })
        res.jsend.success(res.status)
        await transaction.commit()
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
};

exports.update = async (req, res) => {
    try {
        let updateMember = await Member.update({
            status: req.body.status
        }, {
            where: {
                id: req.params.id
            }
        })

        updateMember[0] === 0 ?
            res.jsend.error('Data not found!') :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
};