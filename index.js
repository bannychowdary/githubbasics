//do all imports
var express = require('express')
var ejs = require('ejs')
var bp = require('body-parser')

//initialize tha express app 
var app =express()

//set the view engine
app.set('view engine', 'ejs')

//set the folder where all views will be present 
app.set('views', __dirname + '/template')

app.use(bp.json())
var urlencodeparser= bp.urlencoded({extended:false})

app.get("/",function(req,res){
    res.send("hello from express")
})

app.get("/home",function(req,res){
    res.render('home')
})

app.get("/about",function(req,res){
    res.render('about')
})

app.post("/about",urlencodeparser,function(req,res){
    console.log(req.body)
    res.send("Request information:" + JSON.stringify(req.body))
})

app.get('/contact/:name',function(req,res){
    console.log("get in touch with:" + req.params.name)
    console.log(req.body)
    // var profileData = {
    //         "name":req.params.name,
    //         "location":req.body.location,
    //         "time":req.body.time,
            
    // }
   // console.log(profileData)
    //res.send("received data")
    
    res.render('profile',{
                        name:req.params.name,
                        profile:req.body,
                        
    })
})



app.listen(1234)