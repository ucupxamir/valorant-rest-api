const { sequelize } = require('../models/');
const models = require('../models/');
const { Op } = require('sequelize');

const Player = models.Player;
const Team = models.Team;
const Member = models.Member;

exports.findAll = async (req, res) => {
    try {
        await Team.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.findByPk = async (req, res) => {
    try {
        let data = await Team.scope('withDetails').findByPk(req.params.id)
        data === null ?
            res.jsend.error('Data not found!') :
            res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.create = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const saveTeam = await Team.create({
            name: req.body.name,
            region: req.body.region
        }, { transaction });

        const getPlayers = await Player.findAll({
            where: {
                nickname: { [Op.in]: req.body.player.split(', ') }
            }
        }, { transaction });

        let listMember = [];
        for (let i = 0; i < getPlayers.length; i++) {
            listMember.push({
                player: getPlayers[i].id,
                team: saveTeam.id
            })
        };
        const saveMember = await Member.bulkCreate(listMember, { transaction });

        if (saveMember.length < 5) {
            res.jsend.error('Some player is not found!')
        } else {
            res.jsend.success(res.status);
            await transaction.commit()
        }
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
}