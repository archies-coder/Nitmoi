const express = require('express');
const router = express.Router()
const AttendanceModel = require('../models/attendance.model')

//GET
router.get('/api/attendance/',(req, res)=>{
    AttendanceModel.find({})
    .then(doc => {
        res.json(doc).send(doc)
    })
    .catch(err => res.status(500).json(err))
})


//POST
router.post('/api/attendance', (req, res)=>{
    if(!req.body){
        return res.status(400).send('req body missing');
    }
    const day = new AttendanceModel(req.body);
    day.save()
    .then(doc => {
        if(!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router