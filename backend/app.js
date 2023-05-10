const express = require('express');

const app = express();


const eventRoute = require('./routes/event');
const eventplanerRoute = require('./routes/admin');
const clientRoute = require('./routes/client');
const commentsRoute = require('./routes/comments');
const postRoute = require('./routes/post');
const feedbackRoute= require('./routes/feed back');
const ticketRoute = require('./routes/ticket')
const event_attendanceRoute= require('./routes/event_attendance')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/event_attendance',event_attendanceRoute)
app.use('/api/event', eventRoute);
app.use('/api/eventplaner', eventplanerRoute);
app.use('/api/client', clientRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/post', postRoute)
app.use('/api/feedback', feedbackRoute)
app.use('/api/ticket', ticketRoute)

module.exports = app
