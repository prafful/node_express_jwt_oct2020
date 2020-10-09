var jwt = require('jsonwebtoken')

//will validate token (it is not expired and it is not tampered!)

module.exports = (credentials =[])=>{
    return (req, res, next)=>{
        console.log("authorization is called and working!")
        //convert credentials string in array
        if(typeof(credentials)==="string"){
            credentials = [credentials]
        }
        //extract token from request!
        var token  = req.headers['authorization']
        if(!token){
            //if token is not present
            return res.status(401).send("Access denied!!!!")
        }else{
           //check if token is valid!
           //Bearer xkjaskdjakljd.......sflkjs
           var getToken = token.slice(7)
           //verify the token using function!
           jwt.verify(getToken, "some secret key", (err, decoded)=>{
               if(err){
                   console.log("JWT is having error: " + JSON.stringify(err))
                   res.status(401).send("Access Denied with bad token!!!!")
               } 
               //JWT token is good or valid!
               console.log(decoded);
               console.log(credentials);
               if(credentials.length > 0 ){
                    if(decoded.scopes && decoded.scopes.length && credentials.some(role => decoded.scopes.indexOf(role)>= 0)){
                        next()
                    }else{
                        res.status(401).send("Access denied with invalid role!")
                    }
               }else{
                   //user is already authorized!
                   next()
               }
    
             
           })
           
        }
       
       
    }
}