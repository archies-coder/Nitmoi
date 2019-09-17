const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/api/login',async (req, res)=>{
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
        console.log("No user with that email");
        res.status(400).send('wrong credentials')
        return req.next()
    }
    const valid = await bcrypt.compare(req.body.password, existingUser.password);
    if (!valid) {
        res.status(401).send('Wrong pass Bro');
        return req.next()
    }
        req.session.userId = existingUser.id;
        req.session.user = existingUser;
        const sid= req.sessionID
        res.send({
            user: existingUser,
            userId: existingUser.id,
            sid: sid
        })
    return {
        userId: existingUser.id
    }
})

router.post('/api/logout',(req, res)=>{
    req.session.destroy(err=>{
        if(err){
             console.log('Couldnt destroy');
        }
        res.clearCookie('SESS_SID')
        res.send('logged out')
    })
})

router.get('/auth', (req, res)=>{
    if (req.session.userId) {
        res.status(200).send('Authenticated')
    }else{
        res.status(401).send('Not Authenticated')
    }
})

module.exports = router;