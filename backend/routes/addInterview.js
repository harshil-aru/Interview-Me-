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
        user: "iamharshilsagar@gmail.com",
        pass: "Harshil@1999"
    }
});

const routes = require('express').Router();

routes.post('/interviews', function (req, res) {
    // console.log("Request : ", req);
    console.log("req.body => ", req.body);


    let date_INC = req.body.date;
    let startTime_INC = req.body.startTime;
    let endTime_INC = req.body.endTime;
    let lisOfparticipants = req.body.participants;
    let duration_INC = req.body.duration;
    let description_INC = req.body.description;
    // console.log("lisOfparticipants :", lisOfparticipants);

    if (lisOfparticipants.length < 2) {
        console.error("gen error");
        res.status(401).send({ message: 'Add atleast 2 particpants please!' });
    } else {
        console.log("Find Clashes -----------------------__>");
        let participantIdArray = lisOfparticipants.map((p) => p.id);
        // console.log("participantIdArray : ", participantIdArray);

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
                    // console.log("record : ", record);
                    // There is a CLASH
                    let clashingParticipantId = record.dataValues.participantId;
                    // console.log("clashingParticipantId : ", clashingParticipantId)

                    let msg = "Following Partipant have Clashing Interviews : ";
                    Participants.findByPk(clashingParticipantId)
                        .then((record) => {
                            console.log("Clashing Record : ", record);
                            msg = msg + record.dataValues.name + "(" + record.dataValues.email + ")";
                            console.error("gen error");
                            res.status(401).send({ message: msg });
                        })

                }
                else {
                    // record -> null
                    console.log("NO CLASH");
                    lisOfparticipants.forEach(function (oneParticipant) {
                        // console.log("oneParticipant : ", oneParticipant);
                        let newInterview = {
                            participantId: oneParticipant.id,
                            date: date_INC,
                            startTime: startTime_INC,
                            endTime: endTime_INC,
                            duration: duration_INC,
                            description: description_INC 
                        }
                        Interviews.create(newInterview).then(intrvw => {
                            console.log("intrvw added ---->>>> ", intrvw);

                            console.log("RUN XXXXXXXXXXXXXX");
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