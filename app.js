const express=require('express');
const app=express();
const mongoose=require('mongoose');
const categoryRoute=require('./api/routes/category');
const blogRoute=require('./api/routes/blog');
const userRoute=require('./api/routes/user')
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');

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

app.use('/category',categoryRoute);
app.use('/blog',blogRoute);
app.use('/user',userRoute);

app.get('*',(req,res)=>{
    res.status(200).json({
        msg:'bad request'
    })
})

module.exports=app;
