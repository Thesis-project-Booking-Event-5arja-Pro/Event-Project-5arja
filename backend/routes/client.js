const express = require('express');

const router = express.Router();

const { getAllClients, addClient, getOneClient , deleteOneClient,signIn,updateClient,resetPassword} = require('../controler/client');



router.get('/getAllUser', getAllClients);
router.get('/:id', getOneClient);
router.post('/addUser', addClient);
router.post('/singin', signIn);
router.delete('/:id', deleteOneClient)
router.put('/updateUser', updateClient);
router.post('/resetpassword', resetPassword)

module.exports = router;