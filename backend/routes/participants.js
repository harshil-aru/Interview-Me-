const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { db, Participants, Interviews } = require('../models/databaseSchema')


const routes = require('express').Router();

routes.get('/participants', (req, res) => {
    Participants.findAll()
        .then((users) => res.json(users))

});


module.exports = routes;
