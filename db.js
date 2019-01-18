var express= require('express')
var mongoose= require('mongoose')
var bodyparser = require('body-parser')
var friendModel = require('./model/friend')


var app = express()

app.use(bodyparser.json())

var urlencodeparser = bodyparser.urlencoded({extended:false})

mongoose.connect("mongodb://localhost:27017/productdb")

var db = mongoose.connection

db.on('error', function(){
    console.log("erro connection to the database")
})

db.once('open', function(){
    console.log("connection to database")
})

app.get("/welcome", function(req,res){
    res.send("hello from mongo")
})

app.get("/all", function(req,res){
    friendModel.find({},function(err, data){
        if(err){
            res.send(err)
        }else{
            res.json(data)
        }
    })
})

app.get("/get/:name", function(req,res){
    var pathParam = req.params.name
    console.log(pathParam)
    friendModel.find({name:pathParam},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.json(data)
        }

    })
})

app.post("/add",function(req, res){
    console.log(req.body)
    var friend = new friendModel()
        friend.name = req.body.name
        friend.location = req.body.location
        friend.age = req.body.age
        friend.likes = req.body.likes
        
    friend.save(function(err){
        if(err){
            res.send(err)
        }else{
            res.json({message:'friend added'})
        }
    })

})


app.post("/delete",function(req, res){
    db.collection("cart").deleteOne({"name":"banny"},function(err){
        if(err){
            res.send(err)
        }else{
            res.json({message:'friend deleted'})
        } 
    })
})

app.listen(1234)
