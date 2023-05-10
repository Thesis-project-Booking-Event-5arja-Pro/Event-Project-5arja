const express = require('express');
const router = express.Router();


const { getAllcomments, addcomments, getOnecomments ,deleteOnecomments} = require('../controler/comments');



router.get('/getAllcomments', getAllcomments);
router.get('/:id', getOnecomments);
router.post('/addcomments', addcomments);
router.delete('/:id', deleteOnecomments)

module.exports = router;