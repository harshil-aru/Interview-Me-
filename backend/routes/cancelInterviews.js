const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { Interviews } = require('../models/databaseSchema')


const routes = require('express').Router();

routes.post('/cancelInterview', function(req,res){
    let interviewInfo = req.body.id;
   
   interviewInfo.forEach(function (i) {
       Interviews.destroy({
           where: {
               id: i
           }
       }).then(function (e){

       });
   });
   res.sendStatus(200);
    
})


module.exports = routes;
