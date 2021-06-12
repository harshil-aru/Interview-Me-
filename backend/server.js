const PORT = 5000;

// Configuring dotenv file
const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors');
const express = require('express')

// Importing Sequelize models 
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const { db, Participants } = require('./models/databaseSchema')




const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes= require("./routes");

app.use('/',routes);
// Function to add Dummy Data
function addDumyData() {
   let data = [
       {
           "name": "Naman Roy",
           "email": "ak2407172@gmail.com",
       },
       {
           "name": "Harshil Sagar",
           "email": "iamharshilsagar@gmail.com",
       },
       {
           "name": "Deepesh Reejwani",
           "email": "deepeshreejwani123@gmail.com",
       },
   ]
   data.forEach((user) => {
       Participants.create(user).then(user => {
           console.log(user,"\n");
       })
   })
}
// this function is to set mail id and name for Users/Participants.
// setTimeout(() => {
//     addDumyData();
// }, 500); 

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    })
})
