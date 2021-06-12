const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { Interviews } = require('../models/databaseSchema')


const routes = require('express').Router();

routes.get('/distinctschedules', function (req, res) {
    let cDate = new Date();
    Interviews.findAll({
        where: {
            date: {
                [Op.gte]: cDate,
            }
        },
        // attributes: ['date', 'startTime', 'endTime'],
        order: [['date', 'ASC'], ['startTime', 'ASC'], ['endTime', 'ASC'], ['participantId', 'ASC']],
        group: ['date', 'startTime', 'endTime']
    })
    .then((records) => {
            console.log("records : ", records);
            let distinctSchedules = records.map((rec) => ({
                date: rec.date,
                startTime: rec.startTime,
                endTime: rec.endTime,
                duration: rec.duration,
                description: rec.description,
                id: rec.id
            }))
            console.log("distinctSchedules : ", distinctSchedules);
            res.json(distinctSchedules);
        })
})


module.exports = routes;