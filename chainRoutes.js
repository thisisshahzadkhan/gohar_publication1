var block = require('./block');
var sha256 = require('js-sha256');
var request = require('request');

module.exports = function(app){
    //get list
    app.get('/blocklist',(req,res)=>{
        block.find({},function(err,dbres){
            if(err)console.log(err);
            else{
                console.log(dbres);
                res.json({'blocks':dbres});    
            }
        });
    });
    
    app.post('/getaccess',(req,res)=>{
        // request('http://localhost:4000/hello', function (error, response, body) {
        //     console.log('body:', body);});
        request.post({url:'http://localhost:4000/auth', form:{username:req.body.username,password:req.body.password}}, function (error, response, body) {
                if(error){res.json({message:'authenticating issue'});}
                block.find({deligatee:body},function(err,dbres){
                        if(err){console.log(err);}
                        res.json({policy:dbres});
                });
            });

    });

    app.post('/addpolicy',(req,res)=>{
        block.find({},function(err,dbres){
            console.log('hi');
            if(err)console.log(err);
            else{
                var previousHashTemp;
               if(dbres.length===0){previousHashTemp='genesis';}
               else{
                   previousHashTemp=dbres[dbres.length-1].hash;
                   console.log(previousHashTemp);}
                   var timeStampTemp=new Date().toGMTString();
                   var hashTemp=sha256(previousHashTemp+req.body.deligator+req.body.deligatee+
                    req.body.deviceId+req.body.validTill+timeStampTemp);
                   console.log(hashTemp);
                //create new chain
                block.create(new block({
                    perviousHash: previousHashTemp,
                    deligator:req.body.deligator,
                    deligatee:req.body.deligatee,
                    deviceId:req.body.deviceId,
                    validTill:req.body.validTill,
                    hash:hashTemp,
                    timestamp:timeStampTemp   
                }),function(err,dbres){
                    console.log(err);
                    console.log(dbres);
                    res.json({msg:dbres});
                });        
                     
            }
        });
    });
}
