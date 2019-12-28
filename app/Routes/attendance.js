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
router.put('/api/attendance',async (req, res, next)=>{
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    if(!req.body){
        return res.status(400).send('req body missing');
    }
    //Search if date is already entered
    let dates = []
    const requestedDate = req.body.date.split('T')[0]
    await AttendanceModel.find({},{date:1}).then(doc=>{
        doc.map(obj=>{
            const date = new Date(obj.date).toLocaleDateString()
            const d = date.split('T')[0]
            dates = [...dates, d]
        })
    })
    console.log(dates, requestedDate, dates.indexOf(requestedDate))
    if(dates.indexOf(requestedDate)===-1){
        const day = new AttendanceModel(req.body);
        return day.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        return AttendanceModel.findOneAndUpdate({ date: req.body.date }, req.body)
            .then(doc => res.status(204).json(doc))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
})
module.exports = router