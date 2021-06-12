const Sequelize = require('sequelize')
const Op = Sequelize.Op;
 const date= require('date-fns');
const ISO = date.parseISO;
const { Participants, Interviews } = require('../models/databaseSchema')
// setting up nodemailer
const nodemailer = require('nodemailer');
const { getDefaultNormalizer } = require('@testing-library/react');
// Details of account seding mails
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "SENDER@EMAIL.COM",//Add your email
        pass: "PASSWORDOFSENDER"//Add your password
    }
});

const routes = require('express').Router();

routes.post('/interviews', function (req, res) {
    
    


    let date_INC = req.body.date;
    let startTime_INC = req.body.startTime;
    let endTime_INC = req.body.endTime;
    let lisOfparticipants = req.body.participants;
    let duration_INC = req.body.duration;
    let description_INC = req.body.description;
    

    if (lisOfparticipants.length < 2) {
        
        res.status(401).send({ message: 'Add atleast 2 particpants please!' });
    } else {
        let participantIdArray = lisOfparticipants.map((p) => p.id);
        

        Interviews.findOne({
            where: {
                date: date_INC,
                [Op.not]: [{
                    [Op.or]: [{
                        startTime: {
                            [Op.gte]: endTime_INC
                        }
                    }, {
                        endTime: {
                            [Op.lte]: startTime_INC
                        }
                    }
                    ]
                    }],
                participantId: {
                    [Op.in]: participantIdArray
                }
            }
        })
            .then(function (record) {
                if (record) {
                    
                    // There is a CLASH
                    let clashingParticipantId = record.dataValues.participantId;
                    

                    let msg = "These Partipants won't be able to make there : ";
                    Participants.findByPk(clashingParticipantId)
                        .then((record) => {
                            
                            res.status(401).send({ message: msg });
                        })

                }
                else {
                    
                    
                    lisOfparticipants.forEach(function (oneParticipant) {
                        
                        let newInterview = {
                            participantId: oneParticipant.id,
                            date: date_INC,
                            startTime: startTime_INC,
                            endTime: endTime_INC,
                            duration: duration_INC,
                            description: description_INC 
                        }
                        Interviews.create(newInterview).then(intrvw => {
                            
                            let participantEmail = oneParticipant.email;
                            // Sending a MAIL

                            let mailText = `Hello, ${oneParticipant.name}.
You have your Interview ${description_INC} on ${ISO(date_INC)} from ${startTime_INC} to ${endTime_INC}.
Duration : ${duration_INC}`;
                            var mailOptions = {
                                to: participantEmail,
                                subject: 'Interview Details.',
                                text: mailText
                            }
                            smtpTransport.sendMail(mailOptions, function (err, res) {
                                if (err) {
                                    console.log("Error : ", err)
                                }
                                else {
                                    console.log('Email sent: ' + res.response);
                                }
                            })

                        })
                    })
                    res.sendStatus(200);
                }
            })

    }
    console.log("Interview ADDED");

})

module.exports = routes;
