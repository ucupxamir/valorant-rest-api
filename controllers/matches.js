const { sequelize } = require('../models/');
const models = require('../models/');

const Team = models.Team;
const Member = models.Member;
const Map = models.Map;
const Tournament = models.Tournament;
const Participant = models.Participant;
const Match = models.Match;
const Score = models.Score;
const Scoreboard = models.Scoreboard;

exports.getAll = async (req, res) => {
    try {
        let data = await Match.findAll();
        res.jsend.success(data);
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.getById = async (req, res) => {
    try {
        let data = await Match.scope('withDetails').findByPk(req.params.id);
        res.jsend.success(data);
    } catch (error) {
        res.jsend.error(error)
    }
};

exports.create = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        let getTournament = await Tournament.findOne({
            where: {
                name: req.body.tournament
            }
        }, { transaction });

        if (!getTournament) {
            throw new Error(`Tournament not found!`)
        }

        let getMap = await Map.findOne({
            where: {
                name: req.body.map
            }
        }, { transaction });

        if (!getMap) {
            throw new Error(`Map not found!`)
        }

        let inputTeams = req.body.team.split(', ');

        let getTeams = await Team.findAll({
            where: {
                name: inputTeams
            }
        }, { transaction });
        
        if (getTeams.length > 2) {
            throw new Error(`One match only has two participants`)
        } else if (getTeams.length < 2) {
            throw new Error(`One match must have two participants`)
        }

        let teamsId = [];
        for (let i = 0; i < getTeams.length; i++) {
            teamsId.push(getTeams[i].id)
        }

        let getParticipants = await Participant.findAll({
            where: {
                team: teamsId,
                tournament: getTournament.id
            }
        }, { transaction });

        if (getParticipants.length != 2) {
            throw new Error(`Some team has not participate on this tournament`)
        }

        let getMembers1 = await Member.findAll({
            where: {
                team: teamsId[0],
                status: ['active', 'loan']
            }
        }, { transaction });

        let getMembers2 = await Member.findAll({
            where: {
                team: teamsId[1],
                status: ['active', 'loan']
            }
        }, { transaction });

        if (getMembers1.length != 5 || getMembers2.length != 5) {
            throw new Error(`Some member not found!`)
        }

        let saveMatch = await Match.create({
            tournament: getTournament.id,
            date: req.body.date,
            map: getMap.id
        }, { transaction });

        let scores = [];
        for (let i = 0; i < inputTeams.length; i++) {
            scores.push({
                match: saveMatch.id,
                participant: getParticipants[i].id,
                score: 0
            })
        }
        let saveScore = await Score.bulkCreate(scores, { transaction });

        let scoreboards = [];

        for (let i = 0; i < getMembers1.length; i++) {
            scoreboards.push({
                score: saveScore[0].id,
                member: getMembers1[i].id
            })
        }

        for (let i = 0; i < getMembers2.length; i++) {
            scoreboards.push({
                score: saveScore[1].id,
                member: getMembers2[i].id
            })
        }

        await Scoreboard.bulkCreate(scoreboards, { transaction });
        res.jsend.success(res.status);
        await transaction.commit()
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
}