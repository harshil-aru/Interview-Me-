const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { Interviews } = require('../models/databaseSchema')


const routes = require('express').Router();

routes.get('/interviews', function (req, res) {

    let cDate = new Date();
    //Find all interviews which are greater than the current time hence
     
    Interviews.findAll({
        where: {
            date: {
                [Op.gte]: cDate,
            }
        },
        // attributes: ['date', 'startTime', 'endTime'],
        order: [['date', 'ASC'], ['startTime', 'ASC'], ['endTime', 'ASC'], ['participantId', 'ASC']],
        // group: ['date', 'startTime', 'endTime']
    })
    .then((records) => {
            console.log("records : ", records);
            
            res.json(records);
        })

})



module.exports = routes;
