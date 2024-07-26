const express=require('express');
const router=express.Router();
const Category=require('../model/category');
const category = require('../model/category');
const mongoose=require('mongoose');
const checkAuth=require('../middleware/checkAuth');

//add new category
router.post('/',checkAuth,(req,res)=>{
    console.log(req.body);
    const category=new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name
    })
    category.save().then(result=>{
        res.status(200).json({
            new_data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//get all category
router.get('',(req,res)=>{
    Category.find()
    .then(result=>{
        res.status(200).json({
            category:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get data from mongodb by id
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Category.findById(req.params.id).then(result=>{
        res.status(200).json({
            category:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//delete
router.delete('/:id',checkAuth,(req,res)=>{
    console.log(req.params.id);
    Category.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.status(200).json({
            msg:result
        })
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;