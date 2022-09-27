const { sequelize } = require('../models/');
const models = require('../models/');
const { Op } = require('sequelize')

const Team = models.Team;
const Region = models.Region;
const Player = models.Player;
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

        const [region, created] = await Region.findOrCreate({
            where: {
                name: req.body.region
            }
        }).then(async (team, player) => {
            team = await Team.create({
                team: req.body.name,
                region: region.id
            })
        });

        transaction = await sequelize.transaction();
        const player = await Player.findAll({
            where: {
                nickname: { [Op.in]: req.body.player.split(', ') }
            }
        }, { transaction })

        let listMember = [];
        for (let i = 0; i < player.length; i++) {
            listMember.push({
                player: player[i].id,
                team: team.id
            })
        };
        const member = await Member.bulkCreate(listMember, { transaction });

        if (member.length < 5) {
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