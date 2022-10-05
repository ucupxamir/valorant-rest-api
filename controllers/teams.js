const { sequelize } = require('../models/');
const models = require('../models/');

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

        let saveTeam = await Team.create({
            name: req.body.name,
            region: req.body.region
        }, { transaction })

        let inputPlayers = req.body.player.split(', ');
        let players = [];
        for (let i = 0; i < inputPlayers.length; i++) {
            players.push({
                nickname: inputPlayers[i]
            })
        }
        let savePlayers = await Player.bulkCreate(players, { ignoreDuplicates: true }, { transaction })

        let members = [];
        for (let i = 0; i < savePlayers.length; i++) {
            members.push({
                player: savePlayers[i].id,
                team: saveTeam.id
            })
        };
        await Member.bulkCreate(members, { transaction });

        res.jsend.success(res.status);
        await transaction.commit()
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
}