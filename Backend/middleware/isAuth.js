const jwt = require("jsonwebtoken");

const User = require("../model/User.js");

const isAuth = async (req, res, next) =>{
    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({message : "No Token Provided . please Log in"});
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken || !verifyToken.userId){
            return res.status(404).json({message : "Invalid Token. Access Denied"});
        }

        req.userId = verifyToken.userId;

        next();
    }
    catch(error){
        res.status(401).json({message :`isAuth Error : ${error.message}`});
    }
};

module.exports = isAuth;