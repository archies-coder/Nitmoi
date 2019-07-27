const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/api/login',async (req, res)=>{
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
        throw new Error("No user with that email");
    }
    const valid = await bcrypt.compare(req.body.password, existingUser.password);
    if (!valid) {
        res.status(401).send('Wrong pass Bro');
    }
        req.session.userId = existingUser.id;
        req.session.user = existingUser;
        const sid= req.sessionID
        res.send(req.sessionID)
    return {
        userId: existingUser.id,
        user: existingUser,
        sid: sid
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

module.exports = router;