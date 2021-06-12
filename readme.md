**Interview Me!!**

Description
Interview Me!! is a simple app where admins can create interviews by selecting participants, interview start time and end time

Basic Requirements
An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if: 
Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
No of participants is less than 2
An interviews list page where admin can see all the upcoming interviews.
An interview edit page where admin can edit the created interview with the same validations as on the creation page.
Note: No need to add a page to create Users/Participants. Create them directly in the database

Along with the basic requirements i have also added-
A single page frontend app based on react 
Ability to edit and delete interviews
Ability to Send a mail to all the participants of a meeting
Ability to set a description and track duration of meet
Also i have added the state to frontend whenever you edit an interview we would be able to see the things which were done before

For the wesite the opening point is the root folder and 

npm start will easily start the react scripts

to start the backend and check the the api endpoints go to backend folder and open terrminal write the command:
node server will easily fire up the backend all the routes and functionalities can be easily found in routes folder and the Database Schema can be easily found the Models folder. i have used Postgresql as the backend along with Node.js for the server along with express server. For mailing service nodemailer is used.