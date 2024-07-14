const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async(req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(400);
                throw new Error("Book is not authorized");
            }
            req.book = decoded.book;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("Book is not authorized or token is missing");
        }
    }
});

module.exports = validateToken;