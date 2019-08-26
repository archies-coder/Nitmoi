const express = require('express');
const router = express.Router()
const studentModel = require('../models/student.model').Student;
const cors = require('cors')


//Get Students by standard
router.get('/api/student/:std', (req, res, next) => {
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    studentModel.find({
        standard: req.params.std
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

//Get Students by standard
router.get('/api/students', (req, res, next) => {
    if(!req.session.userId){
        res.status(401)
        return next();
    }
    studentModel.find()
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err));
})

//Get Students by First Name
router.get('/api/student', (req, res, next) => {
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    studentModel.find({
        firstName: req.query.fname
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

//Add Student
router.post('/api/student', (req, res, next) => {
    if(!req.session.userId){
        res.sendStatus(401)
        return next();
    }
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
            throw new Error(err)
        })
    return student;
})

//Update
router.put('/api/student', (req, res, next) => {
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    if(!req.query.id) {
        return res.status(400).send('Missing URL parameter: fname')
    }
    studentModel.findByIdAndUpdate({
        _id: req.query.id
    }, req.body, {
        new: true
    })
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

// DELETE
router.delete('/api/student', (req, res, next) => {
    if(!req.session.userId){
        res.status(401).send('not authenticated')
        return next();
    }
    if(!req.query.id) {
      return res.status(400).send('Missing URL parameter: fname')
    }
  
    studentModel.findOneAndRemove({
      _id: req.query.id
    })
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

module.exports = router