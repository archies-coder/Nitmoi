const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const validator = require("validator");
const bcrypt = require('bcrypt');

router.get('/api/user',(req,res)=>{
    const user = UserModel.findOne({email: req.body.email})
        .then(doc=>res.json(doc))
        .catch(err=>res.status(500));
    return user;
})

router.post('/api/user',async (req,res)=>{
    // req.body={email,password}
    let errors = [];
    if(!req.body){
        errors.push({message:"No Req Body"})
    }
    if (
    validator.isEmpty(req.body.password) ||
    !validator.isLength(req.body.password, { min: 5 })
    ) {
    errors.push({ message: "Password too short" });
    }
    if (errors.length > 0) {
    throw new Error(errors.map(item => item.message));
    }
    const ExistingUser = await UserModel.findOne({ email: req.body.email });
    if (ExistingUser) {
        throw new Error("User exists already!");
    }
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const user = new UserModel({
        email: req.body.email,
        password: hashedPw
    });
    const createdUser = await user.save()
    const userId = createdUser._id.toString();
    req.session.userId = userId;
    res.send(createdUser);
    return {...createdUser._doc, userId};
})

module.exports= router;