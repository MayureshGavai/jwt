const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({message : "Access Denied"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err,data)=>{
        if(err){
            res.status(401).json({message: "Failed to authenticate token"})
        }
        console.log(data)
        req.user = data
        next()
    })
}

module.exports = verifyToken