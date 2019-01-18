var mongoose = require('mongoose')

var mySQLSchema = mongoose.Schema

var friendSchema = new mySQLSchema({
    "name" : String,
    "location" : String,
    "age": Number,
    "likes": Number

},{collection:'cart'})

module.exports = mongoose.model('cart', friendSchema)


