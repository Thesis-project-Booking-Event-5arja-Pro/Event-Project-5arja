const express = require('express');
const router = express.Router();


const { getAllticket, addticket, getOneticket ,deleteOneticket} = require('../controler/ticket');


router.get('/getAllticket', getAllticket);
router.get('/:id', getOneticket);
router.post('/addticket', addticket);
router.delete('/:id', deleteOneticket)

module.exports = router;