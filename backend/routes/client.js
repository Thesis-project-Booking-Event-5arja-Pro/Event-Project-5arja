const express = require('express');

const router = express.Router();

const { getAllclient, addClient, getOneclient , deleteOneclient,signIn,updateClient} = require('../controler/client');



router.get('/getAllclient', getAllclient);
router.get('/:id', getOneclient);
router.post('/addclient', addClient);
router.post('/singin', signIn);
router.delete('/:id', deleteOneclient)
router.put('/updateclient', updateClient);

module.exports = router;