const express = require('express');
const router = express.Router();


const { getAllfeedback, addfeedback, getOnefeedback , deleteOnefeedback} = require('../controler/feed back');


router.get('/getAllfeedback', getAllfeedback);
router.get('/:id', getOnefeedback);
router.post('/addfeedback', addfeedback);
router.delete('/:id', deleteOnefeedback)

module.exports = router;