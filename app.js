const express=require('express');
const app=express();
const mongoose=require('mongoose');
const categoryRoute=require('./api/routes/category');
const blogRoute=require('./api/routes/blog');
const userRoute=require('./api/routes/user')
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
const rateLimit=require('express-rate-limit');

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"too many request from this ip"
})
//app.use(limiter); //set to all

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.kcsiwae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(res=>{
    console.log('mongodb  connected');
})
.catch(err=>{
    console.log(err);
})

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/category',limiter,categoryRoute);
app.use('/blog',/*limiter,*/blogRoute);
app.use('/user',userRoute);

app.get('*',(req,res)=>{
    res.status(200).json({
        msg:'bad request'
    })
})

module.exports=app;
