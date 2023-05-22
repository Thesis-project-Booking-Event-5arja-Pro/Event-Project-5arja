const express = require('express');
const router = express.Router();


const { getAlliked, addliked, getOneliked , deleteOneliked} = require('../controler/likes');


router.get('/getAllLike', getAlliked);
router.get('/:email', getOneliked);
router.post('/addLike', addliked);
router.delete('/:id', deleteOneliked)

module.exports = router;