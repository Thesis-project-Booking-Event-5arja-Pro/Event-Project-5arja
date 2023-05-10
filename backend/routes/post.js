const express = require('express');
const router = express.Router();


const { getAllpost, addpost, getOnepost ,deleteOnepost} = require('../controler/post');


router.get('/getAllpost', getAllpost);
router.get('/:id', getOnepost);
router.post('/addpost', addpost);
router.delete('/:id', deleteOnepost)

module.exports = router;