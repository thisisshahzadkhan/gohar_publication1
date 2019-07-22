var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser'),
    request = require('request');
var app=express();

mongoose.connect('mongodb://localhost:27017/blockchain');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

require('./chainRoutes')(app);

app.listen(3000,()=>{
    console.log("server is up");
});

