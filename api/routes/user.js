const express=require('express');
const router=express.Router();
const User = require('../model/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const rateLimit=require('express-rate-limit');

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:3,
    message:"too many request from this ip"
})

//signup
router.post('/signup',(req,res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user=new User({
                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

//login
router.post('/login',limiter,(req,res)=>{
    User.find({email:req.body.email})
    .then(user=>{
        if(user.length<1){
            return res.status(404).json({
                msg:'User not found'
            })
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(!result){
                    return res.status(401).json({
                        msg:'password not match'
                    })
                }
                if(result){
                    const token=jwt.sign({
                        email:user[0].email,
                        password:user[0].password
                    },
                    'this is mern  api token',{
                        expiresIn:'24h'
                    }
                    );
                    res.status(200).json({
                        result:user[0],
                        token:token
                    })
                }
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;
