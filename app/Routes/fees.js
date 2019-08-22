const express = require('express');
const router = express.Router();
const StudentModel = require('../models/student.model').Student;

router.get('/api/fee/:id',(req, res)=>{
    const stud = StudentModel.findById({_id: req.params.id})
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>console.log(err))
    return stud
})

router.put('/api/fee/:id',(req, res)=>{
    return StudentModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(doc=>res.json(doc))
    .catch(err=>console.log(err))
})

router.put('/api/fee/installment/:id', (req, res)=>{
    // return StudentModel.findByIdAndUpdate(
    //     {
    //         _id: req.query.id
    //     },
    //     {$push: {
    //         fees: {
    //         installments: req.body
    //     }
    // }
    // }).then(doc=>res.json(doc))
    // .catch(err=>console.log(err))
    const stud = StudentModel.findById({_id: req.params.id}).then(doc=>{
        doc.fees.installments.push(req.body)
        doc.save().then(doc=>res.json(doc)).catch(err=>console.log(err))
    })
})


module.exports = router;