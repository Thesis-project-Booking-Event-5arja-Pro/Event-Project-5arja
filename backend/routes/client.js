const express = require('express');
const router = express.Router();


const { getAllclient, addclient, getOneclient , deleteOneclient} = require('../controler/client');



router.get('/getAllclient', getAllclient);
router.get('/:id', getOneclient);
router.post('/addclient', addclient);
router.delete('/:id', deleteOneclient)

module.exports = router;