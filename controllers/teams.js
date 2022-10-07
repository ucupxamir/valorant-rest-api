const { sequelize } = require('../models/');
const models = require('../models/');

const Player = models.Player;
const Team = models.Team;
const Member = models.Member;

exports.getAll = async (req, res) => {
    try {
        await Team.findAll().then(data => {
            res.jsend.success(data)
        })
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.getById = async (req, res) => {
    try {
        let data = await Team.scope('withMembers').findByPk(req.params.id)
        let activeMembers = [];
        let formerMembers = [];
        for (let i = 0; i < data.Members.length; i++) {
            if (data.Members[i].status == 'active' || data.Members[i].status == 'loan') {
                activeMembers.push(data.Members[i])
            } else {
                formerMembers.push(data.Members[i])
            }
        }
        let result = {
            id: data.id,
            name: data.name,
            region: data.region,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            ActiveMembers: activeMembers,
            FormerMembers: formerMembers
        };

        res.jsend.success(result)
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

        let inputPlayers = req.body.players.split(', ');
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

exports.update = async (req, res) => {
    try {
        let data = await Team.update({
            name: req.body.name,
            region: req.body.region,
            status: req.body.status
        }, {
            where: {
                id: req.params.id
            }
        })
        data[0] === 0 ?
            res.jsend.error(`Data not found!`) :
            res.jsend.success(res.status)
    } catch (error) {
        res.jsend.error(error)
    }
}