const express = require('express');
const router = express.Router();


const { getAllEventplaner, addEventplaner, getOneEventplaner , deleteOneEventplaner} = require('../controler/admin');



router.get('/getAll', getAllEventplaner);
router.get('/:id', getOneEventplaner);
router.post('/add', addEventplaner);
router.delete('/:id', deleteOneEventplaner)

module.exports = router;