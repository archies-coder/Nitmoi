const express = require('express');
const router = express.Router()
const AttendanceModel = require('../models/attendance.model')

//GET
router.get('/api/attendance/',(req, res,next)=>{
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    if(!req.query.date){
        res.send('Please provide date!')
        return next()
    }
    AttendanceModel.findOne({date: req.query.date})
    .then(doc => {
        if(!doc){
            res.sendStatus(404)
        }
        res.json(doc).send(doc)
    })
    .catch(err => res.status(500))
})


//POST
router.post('/api/attendance', (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
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