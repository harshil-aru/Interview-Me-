const routes = require('express').Router();
const participants= require('./participants');
const interviews= require('./interviews');
const distinctschedules= require('./distinctschedules');
const addInterview= require('./addInterview');
const cancelInterviews= require('./cancelInterviews');



routes.get('/', (req, res) => {
  console.log("connected");
});

routes.get('/participants',participants);

routes.get('/interviews',interviews);
routes.post('/interviews',addInterview);

routes.get('/distinctschedules',distinctschedules);
routes.post('/cancelInterview',cancelInterviews);


module.exports = routes;
