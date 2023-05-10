const express = require('express');
const router = express.Router();


const { getAllEvent, addEvent, getOneEvent ,deleteOneEvent} = require('../controler/events');


router.get('/getAllevent', getAllEvent);
router.get('/:id', getOneEvent);
router.post('/addevent', addEvent);
router.delete('/:id', deleteOneEvent)

module.exports = router;