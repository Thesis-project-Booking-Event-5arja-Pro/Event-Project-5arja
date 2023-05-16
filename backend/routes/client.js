const express = require('express');
const router = express.Router();

const { getAllclient, addClient, getOneclient , deleteOneclient,signIn} = require('../controler/client');



router.get('/getAllclient', getAllclient);
router.get('/:id', getOneclient);
router.post('/addclient', addClient);
router.post('/singin', signIn);
router.delete('/:id', deleteOneclient)

module.exports = router;