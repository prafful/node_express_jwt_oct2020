var express = require('express')
var jwt = require('jsonwebtoken')

var authorization = require('./authorization')

var app = express()

var port = process.env.PORT || 3000

//generate a new token
//assumed - given user is already authenticated on name!
app.get('/token', (req, res)=>{
 
    //given user who is authenticated
    let payload = {
        name:"manager",
        scopes: ["friends:create", "friends:read"]
    }

    let token = jwt.sign(payload, "some secret key")  //some secret key will come from .env file!
    res.send(token)

})


app.get('/friends', authorization("friends:delete") ,(req, res)=>{
    res.send("List of all friends")
})

app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
})