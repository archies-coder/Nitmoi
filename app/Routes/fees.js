const express = require('express');
const router = express.Router();
const StudentModel = require('../models/student.model').Student;

// Get Fees (Entire Student) by student id
router.get('/api/fee/:id',(req, res)=>{
    const stud = StudentModel.findById({_id: req.params.id})
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>console.log(err))
    return stud
})

// Update Student For fees
router.put('/api/fee/:id',(req, res)=>{
    return StudentModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(doc=>res.json(doc))
    .catch(err=>console.log(err))
})

// Add Installment
router.put('/api/fee/installment/:id', (req, res)=>{
    return StudentModel.findById({_id: req.params.id})
    .then(doc=>{
        doc.fees.installments.push(req.body)
        doc.save()
        .then(doc=>res.json(doc))
        .catch(err=>console.log(err))
    })
})


module.exports = router;