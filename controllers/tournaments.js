const { sequelize } = require('../models/');
const models = require('../models/');
const { Op } = require('sequelize');

const Tournament = models.Tournament;
const Team = models.Team;
const Participant = models.Participant;

exports.getAll = async (req, res) => {
    try {
        let data = await Tournament.findAll();
        res.jsend.success(data)
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.getById = async (req, res) => {
    try {
        let data = await Tournament.scope('withDetails').findByPk(req.params.id);
        res.jsend.success(data);
    } catch (error) {
        res.jsend.error(error)
    }
}

exports.create = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        let saveTournament = await Tournament.create({
            name: req.body.name,
            location: req.body.location,
            start: req.body.start,
            end: req.body.end
        }, { transaction });

        let inputParticipants = req.body.participants.split(', ');

        let getTeam = await Team.findAll({
            where: { 
                name: inputParticipants
            }
        }, { transaction });

        let participants = [];
        for (let i = 0; i < getTeam.length; i++) {
            participants.push({
                tournament: saveTournament.id,
                team: getTeam[i].id
            })
        }
        await Participant.bulkCreate(participants, { transaction });

        res.jsend.success(res.status);
        await transaction.commit()
    } catch (error) {
        res.jsend.error(error)
        if (transaction) {
            await transaction.rollback()
        }
    }
}