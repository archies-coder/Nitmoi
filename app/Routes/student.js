const express = require('express');
const router = express.Router()
const studentModel = require('../models/student.model')
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//Get Students by standard
router.get('/student/:std', (req, res) => {
    studentModel.find({
        standard: req.params.std
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

//Get Students by standard
router.get('/students', (req, res) => {
    studentModel.find()
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err));
})

//Get Students by First Name
router.get('/student', (req, res) => {
    studentModel.find({
        firstName: req.query.fname
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

//Add Student
router.post('/student',cors(corsOptions), (req, res) => {
    if(!req.body){
        return res.status(400).send('req body missing');
    }
    if(!req.body.standard){
        return res.status(400).send('req body missing');
    }
    const student = new studentModel(req.body)
    student.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    res.send(student);
})

//Update
router.put('/student', (req, res) => {
    if(!req.query.firstName) {
        return res.status(400).send('Missing URL parameter: fname')
    }
    studentModel.findByIdAndUpdate({
        firstName: req.query.fname
    }, req.body, {
        new: true
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

// DELETE
router.delete('/student', (req, res) => {
    if(!req.query.fname) {
      return res.status(400).send('Missing URL parameter: fname')
    }
  
    studentModel.findOneAndRemove({
      firstName: req.query.fname
    })
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

module.exports = router