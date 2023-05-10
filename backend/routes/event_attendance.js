const express = require('express');
const router = express.Router();


const { getAllevent_attendance, addevent_attendance, getOneevent_attendance ,deleteOneevent_attendance} = require('../controler/event_attendance');



router.get('/getAllevent_attendance', getAllevent_attendance);
router.get('/:id', getOneevent_attendance);
router.post('/addevent_attendance', addevent_attendance);
router.delete('/:id', deleteOneevent_attendance)

module.exports = router;