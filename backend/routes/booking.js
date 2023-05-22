const express = require('express');
const router = express.Router();


const { getAllbooking, addbooking, getOnebooking ,deleteOnebooking} = require('../controler/booking');


router.get('/getAllbooking', getAllbooking);
router.get('/:email', getOnebooking);
router.post('/addbooking',addbooking);
router.delete('/:id', deleteOnebooking)

module.exports = router;